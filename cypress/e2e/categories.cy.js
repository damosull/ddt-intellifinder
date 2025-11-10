/// <reference types="cypress" />
import { LoginPage } from "../support/pom/Login.page";
import { SideMenuPage } from "../support/pom/SideMenu.page";

import { CategoriesPage } from "../support/pom/category/Categories.page";
import { CreateCategoryPage } from "../support/pom/category/CreateCategory.page";
import { DeletePopupPage } from "../support/pom/category/DeletePopup.page";
import { UpdateCategoryPage } from "../support/pom/category/UpdateCategory.page";

describe("Categories Test Suite", () => {
  const loginPage = new LoginPage();
  const sideMenuPage = new SideMenuPage();

  const createCategoryPage = new CreateCategoryPage();
  const categoriesPage = new CategoriesPage();
  const deletePopupPage = new DeletePopupPage();
  const updateCategoryPage = new UpdateCategoryPage();

  const timestamp = new Date().getTime();

  beforeEach(() => {
    cy.visit("/");
    loginPage.login();
    sideMenuPage.openCategoriesPage();
  });

  it("Create Category", () => {
    const categoryName = `Created Name - ${timestamp}`;
    categoriesPage.openCreateCategoryPage();
    createCategoryPage.createCategory(categoryName);
    categoriesPage.searchCategory(categoryName);
    categoriesPage.verifyCategoryIsVisible(categoryName);
    categoriesPage.searchCategory(categoryName);
    categoriesPage.clickDeleteButtonForFirstRecord();
    deletePopupPage.confirmDeletion();
    categoriesPage.searchCategory(categoryName);
    categoriesPage.verifyCategoryDeleted();
  });

  it("Update Category", () => {
    const updatedCategoryName = `Updated Name - ${timestamp}`;
    categoriesPage.clickEditButtonForFirstRecord();
    updateCategoryPage.updateCategoryName(updatedCategoryName);
    categoriesPage.searchCategory(updatedCategoryName);
    categoriesPage.verifyCategoryIsVisible(updatedCategoryName);
  });

  it("Delete Category", () => {
    categoriesPage.getFirstCategoryName().then((categoryName) => {
      categoriesPage.searchCategory(categoryName);
      categoriesPage.clickDeleteButtonForFirstRecord();
      deletePopupPage.confirmDeletion();
      categoriesPage.searchCategory(categoryName);
      categoriesPage.verifyCategoryDeleted();
    });
  });
});
