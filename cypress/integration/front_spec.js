describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true)
  })
})

describe('Convert End2End test', () => {
  it('should convert 3 to III', () => {
    cy.visit('localhost:3000/');
    cy.get('#arabicNumber').type("3");
    cy.get('#convertButton').click();
    cy.get('#lastResult').should('contain', 'III');
  })
})
