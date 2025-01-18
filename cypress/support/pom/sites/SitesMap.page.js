export class SitesMapPage {
    btnViewAllOnMapSearch = () => cy.contains('View all on map')
    pageTitle = () => cy.get('h3').contains('Sites list')

    openAndVerifySiteData() {
        cy.intercept('POST', 'api/site/sites').as('postSites');
        this.btnViewAllOnMapSearch().click();
        cy.wait('@postSites').then((intercept) => {
            expect(intercept.response.statusCode).to.eq(200);
            intercept.response.body.data.sites.forEach((site) => {
                expect(site).to.have.property('name').and.be.a('string');
                expect(site).to.have.property('lat').and.be.a('string');
                expect(site).to.have.property('lon').and.be.a('string');
            });
        })
    }
}