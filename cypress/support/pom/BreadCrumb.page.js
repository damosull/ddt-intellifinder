export class BreadCrumbPage {
  sitesBreadcrumb = () => cy.get(".a-breadcrumb").contains("Sites");
}
