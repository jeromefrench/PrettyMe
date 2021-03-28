// https://www.codeheroes.fr/2020/06/02/communication-temps-reel-avec-server-sent-events-sse/
const SSEClient = require('./SSEClient');

class SSEManager {
  constructor() {
    /* On garde une liste de tous les clients connect�s */
    this.clients = new Map();
  }

  /**
   * Initialise une nouvelle connexion avec un client
   * @function open
   * @param {number|string} clientId - L'identifiant du client
   * @param {Object} context - La r�ponse HTTP
   */
  open(clientId, context) {
    const client = new SSEClient(context);
    client.initialize();
    this.clients.set(clientId, client);
  }

  /**
   * Supprime un client
   * @function delete
   * @param {number|string} clientId - L'identifiant du client
   */
  delete(clientId) {
    this.clients.delete(clientId);
  }

  /**
   * Supprime tous les clients
   * @function deleteAll
   */
  deleteAll() {
    this.clients.clear();
  }

  /**
   * Envoie un message � un seul client
   * @function unicast
   * @param {number|string} clientId - L'identifiant du client
   * @params {Object} message - Le message � envoyer au client
   * @params {number|string} [message.id] - L'identifiant unique du message
   * @params {string} [message.type='message'] - Le type de message
   * @params {number} [message.retry] - Le d�lai en millisecondes avant une tentative de reconnexion au serveur
   * @params {string} message.data - Le contenu du message
   */
  unicast(clientId, message) {
    const client = this.clients.get(clientId);
    if (client) {
      client.sendMessage(message);
    }
  }

  confirmConnection(clientId){
    const client = this.clients.get(clientId);
    if (client) {
      client.sendConfirm();
    }
  }


  /**
   * Envoie un message � tout les clients
   * @function broadcast
   * @params {Object} message - Le message � envoyer aux clients
   * @params {number|string} [message.id] - L'identifiant unique du message
   * @params {string} [message.type='message'] - Le type de message
   * @params {number} [message.retry] - Le d�lai en millisecondes avant une tentative de reconnexion au serveur
   * @params {string} message.data - Le contenu du message
   */
  broadcast(message) {
    for (const [id] of this.clients) {
      this.unicast(id, message);
    }
  }

  /**
   * Envoie un message � une liste de client
   * @function multicast
   * @param {Array} clientIds - Les identifiants des clients
   * @params {object} message - Le message � envoyer aux clients
   * @params {number|string} [message.id] - L'identifiant unique du message
   * @params {string} [message.type='message'] - Le type de message
   * @params {number} [message.retry] - Le d�lai en millisecondes avant une tentative de reconnexion au serveur
   * @params {string} message.data - Le contenu du message
   */
  multicast(clientIds, message) {
    for (const id of clientIds) {
      this.unicast(id, message);
    }
  }

  /**
   * Retourne le nombre de clients connect�s
   * @function count
   * @returns {number}
   */
  count() {
    return this.clients.size;
  }
}

module.exports = SSEManager;
