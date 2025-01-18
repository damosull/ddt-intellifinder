export class SitesNearestPage {
    btnNearest = () => cy.contains('Nearest');
    siteNames = () => cy.get('tr td a.orange');

    openAndVerifyDistancesInAscendingOrder() {
        this.btnNearest().click();
        const distances = [];

        // Get the distance of each site
        this.siteNames().each(($el) => {
            const text = $el.text();

            cy.extractDistance(text).then((distance) => {
                if (distance !== null) {
                    cy.log(`Extracted distance: ${distance}`);
                    distances.push(distance);
                } else {
                    cy.log(`No valid distance in text: ${text}`);
                }
            });
        }).then(() => {
            // Sort the distances in ascending order
            const sortedDistances = [...distances].sort((a, b) => a - b);
            cy.log(`Collected distances: ${distances.join(', ')}`);
            cy.log(`Sorted distances: ${sortedDistances.join(', ')}`);

            // Assert that the distances are in ascending order
            expect(distances).to.deep.equal(sortedDistances);
        });
    }
}