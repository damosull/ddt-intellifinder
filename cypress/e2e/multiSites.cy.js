/// <reference types="cypress" />
import { LoginPage } from "../support/pom/Login.page";
import { SideMenuPage } from "../support/pom/SideMenu.page";
import { MultiSitesListPage } from "../support/pom/multisites/MultiSites.page";
import { CreateMultiSitesPage } from "../support/pom/multisites/CreateMultiSites.page";
import { MultiSitesDetailsPage } from "../support/pom/multisites/MultiSitesDetails.page";
import { SubSitesListPage } from "../support/pom/multisites/SubSitesList.page";
import { NewSubSitePopup } from "../support/pom/multisites/NewSubSitePopUp.page";
import { NewPlanDrawingPopup } from "../support/pom/multisites/NewPlanDrawingPopup.page";
import { EditPlanDrawingPopup } from "../support/pom/multisites/EditPlanDrawingPopup.page";
import { MultiSitesEditPage } from "../support/pom/multisites/MultiSitesEdit.page";

describe("MultiSites Test Suite", () => {
  const loginPage = new LoginPage();
  const sideMenuPage = new SideMenuPage();
  const multiSitesListPage = new MultiSitesListPage();
  const createMultiSitesPage = new CreateMultiSitesPage();
  const multiSitesDetailsPage = new MultiSitesDetailsPage();
  const newPlanDrawingPopup = new NewPlanDrawingPopup();
  const subSitesListPage = new SubSitesListPage();
  const editPlanDrawingPopup = new EditPlanDrawingPopup();
  const multiSitesEditPage = new MultiSitesEditPage();
  const timestamp = new Date().getTime();
  const searchName = "test";

  beforeEach(() => {
    cy.visit("/");
    loginPage.login();
    sideMenuPage.openMultiSitesPage();
  });

  describe("MultiSites Management", () => {
    it("Create MultiSite", () => {
      const siteName = `Cypress Created Name - ${searchName + timestamp}`;
      multiSitesListPage.openCreateMultiSitesPage();
      createMultiSitesPage.createMultiSite(siteName);
      multiSitesDetailsPage.clickBackButton();
      createMultiSitesPage.clickBackButton();
      multiSitesListPage.searchMultiSites(siteName);
    });

    it("Edit MultiSite", () => {
      const updatedName = `Updated Name - ${timestamp}`;
      const latitude = 55.3757932;
      const longitude = 10.4396473;
      const phone = "88884444";
      const description = "updated description";
      multiSitesListPage.openFirstSite();
      multiSitesListPage.openEditMultiSitesPage();
      multiSitesEditPage.updateDetails(
        updatedName,
        latitude,
        longitude,
        phone,
        description
      );
      multiSitesEditPage.saveMultiSitesDetails();
      multiSitesListPage.searchMultiSites(updatedName);
    });

    it("Delete MultiSite", () => {
      const siteName = `Cypress Record to delete - ${searchName + timestamp}`;
      multiSitesListPage.openCreateMultiSitesPage();
      createMultiSitesPage.createMultiSite(siteName);
      multiSitesDetailsPage.clickBackButton();
      createMultiSitesPage.clickBackButton();
      multiSitesListPage.searchMultiSites(siteName);
      multiSitesListPage.deleteMultiSite(0);
      multiSitesListPage.verifyMultiSiteDeleted();
    });
  });

  describe("Plan Drawings", () => {
    it("Add a new plan drawing", () => {
      multiSitesListPage.selectMultiSite(searchName);
      multiSitesDetailsPage.openNewPlanDrawingPopup();
      newPlanDrawingPopup.fillPlanDrawingDetails();
      newPlanDrawingPopup.savePlanDrawing();
      newPlanDrawingPopup.verifyPlanDrawingSaved();
    });

    it("Edit a plan drawing", () => {
      multiSitesListPage.selectMultiSite(searchName);
      multiSitesDetailsPage.openNewPlanDrawingPopup();
      newPlanDrawingPopup.fillPlanDrawingDetails();
      newPlanDrawingPopup.savePlanDrawing();
      newPlanDrawingPopup.verifyPlanDrawingSaved();

      multiSitesDetailsPage.openEditPlanDrawingPopup(0);
      editPlanDrawingPopup.updatePlanDrawingDetails();
      editPlanDrawingPopup.savePlanDrawing();
      editPlanDrawingPopup.verifyPlanDrawingSaved();
    });

    it("Delete a plan drawing", () => {
      multiSitesListPage.selectMultiSite(searchName);
      multiSitesDetailsPage.openNewPlanDrawingPopup();
      newPlanDrawingPopup.fillPlanDrawingDetails();
      newPlanDrawingPopup.savePlanDrawing();
      newPlanDrawingPopup.verifyPlanDrawingSaved();
      multiSitesDetailsPage.deletePlanDrawing(0);
    });
  });

  describe("SubSites", () => {
    it.skip("Add a new subsite", () => {
      multiSitesListPage.selectMultiSite(searchName);
      multiSitesDetailsPage.openSubSitesPageForRecord(0);
      subSitesListPage.clickImage();
      NewSubSitePopup.selectSubSite();
      // TODO: Fails because no Sites are appearing in New sub-Site popup. Need to investigate why none are showing
    });
  });
});
