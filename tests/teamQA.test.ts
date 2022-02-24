import { expect, test } from '@playwright/test';

import Environment from '../Environment/environment';
import { mysqlpool } from '../Environment/mySqlPool';
import { TeamQAAlertWindowPage } from '../Pages/AlertWindows';
import { TeamQAElementPage } from '../Pages/ElementsPage';
import { TeamQAInteractionsPage } from '../Pages/Interactions';
import { TeamQAWidgetsPage } from '../Pages/Widgets';
import config from "../playwright.config";

test.beforeEach(async ({ page }) => {
    console.info("Go to TeamQA home page")
    await page.goto(`${config.use.baseURL}`);

});

test.describe("1001 - TeamQA Application", async () => {
    test("TC01 - TeamQA Application", async ({ page }) => {
        let login: TeamQAElementPage = new TeamQAElementPage(page)
        await test.step("Step 1 - I click on Elements", async () => {
            await login.clickElements();
        })
        await test.step("Step 2 - I verify the Elements page is opened", async () => {
            await login.verifyElementPageOpened("Elements");
        })
    })

    test("TC02 - Verify Text Box", async ({ page }) => {
        let login: TeamQAElementPage = new TeamQAElementPage(page)
        await test.step("Step 1 - I click on Elements", async () => {
            await login.clickElements();
        })
        await test.step("Step 2 - I click on Text Box", async () => {
            await login.elementsTabSelection("Text Box");
        })
        await test.step("Step 3 - I verify the Text Box page is opened", async () => {
            await login.verifyElementPageOpened("Text Box");
        })
        await test.step("Step 4 - Enter User Details", async () => {
            await login.elementsTextBoxFullName(Environment.userName)
            await login.elementsTextBoxEmail(Environment.email)
            await login.elementsTextBoxCurrentAddress(Environment.Current_Address)
            await login.elementsTextBoxPermanentAddress(Environment.Permanent_Address)
        })
        await test.step("Step 5 - I click on Submit", async () => {
            //await login.elementButtonClick();
        })
        // await test.step("Step 6 - I verify the Text Box output", async () => {
        //     await login.verifyElementTextBoxOutput(Environment.userName);
        // })
    })

    test("TC03 - Verify Check Box", async ({ page }) => {
        let login: TeamQAElementPage = new TeamQAElementPage(page)
        await test.step("Step 1 - I click on Elements", async () => {
            await login.clickElements();
        })
        await test.step("Step 2 - I click on Check Box", async () => {
            await login.elementsTabSelection("Check Box");
        })
        await test.step("Step 3 - I verify Check Box page is opened", async () => {
            await login.verifyElementPageOpened("Check Box");
        })
        await test.step("Step 4 - Open home toggle option  ", async () => {
            await login.openToggle()
        })
        await test.step("Step 5 - I verify home toggle is working", async () => {
            await login.varifyToggleIsWorking()

        })
        await test.step("Step 6 - I close the home toggle option", async () => {
            await login.closeToggle()
        })
        await test.step("Step 7 - I close the home toggle option", async () => {
            await login.enableParentCheckBox()

        })
        await test.step("Step 8 - I close the home toggle option", async () => {
            await login.disableParentCheckBox()
        })
    })

    test("TC04 - Verify Radio Button", async ({ page }) => {
        let login: TeamQAElementPage = new TeamQAElementPage(page)
        await test.step("Step 1 - I click on Elements", async () => {
            await login.clickElements();
        })
        await test.step("Step 2 - I click on Radio Button tab", async () => {
            await login.elementsTabSelection("Radio Button");
        })
        await test.step("Step 3 - I verify Check Box page is opened", async () => {
            await login.verifyElementPageOpened("Radio Button");
        })
        await test.step("Step 4 - Check box verification ", async () => {
            await login.selectRadioButton("Yes")
            await login.validateRadioButton("Yes")
            await login.selectRadioButton("Impressive")
            await login.validateRadioButton("Impressive")
            await login.verifyRadioButtonIsDisabled("No")
        })
    })

    test("TC05 - Verify Web Tables", async ({ page }) => {
        let login: TeamQAElementPage = new TeamQAElementPage(page)
        await test.step("Step 1 - I click on Elements", async () => {
            await login.clickElements();
        })
        await test.step("Step 2 - I click on Web Tables tab", async () => {
            await login.elementsTabSelection("Web Tables");
        })
        await test.step("Step 3 - I verify Web Tables page is opened", async () => {
            await login.verifyElementPageOpened("Web Tables");
        })
        await test.step("Step 4 - Add new record", async () => {
            await login.addNewRecord("Test", "TestlastName", "Test@gmail.com", "30", "1000", "Software Engineer")
        })
        await test.step("Step 5 - I click on submit button ", async () => {
            await login.clickButtonWithText("Submit");
        })
        await test.step("Step 6 - I verify the added record ", async () => {
            //await login.verifyaddedRecord("Test", "TestlastName")
        })
    })

    test("TC06 - Verify Browser Windows", async ({ page }) => {
        let alertWindow: TeamQAAlertWindowPage = new TeamQAAlertWindowPage(page)
        await test.step("Step 1 - I click on Alerts, Frame & Windows", async () => {
            await alertWindow.clickAlertsFramesWindows();
        })
        await test.step("Step 2 - I verify Alerts, Frame & Windows page is opened", async () => {
            await alertWindow.verifyPageOpened("Alerts, Frame & Windows");
        })
        await test.step("Step 3 - I click on Browser Windows tab", async () => {
            await alertWindow.elementsTabSelection("Browser Windows");
        })
        await test.step("Step 4 - I verify Web Tables page is opened", async () => {
            await alertWindow.verifyPageOpened("Browser Windows");
        })
        await test.step("Step 5 - I click on New Tab and I verify whether New Tab is opened", async () => {
            await alertWindow.verifyWhetherNewTabIsOpened("New Tab");
        })
        await test.step("Step 6 - I click on New Window and I verify whether New Window is opened", async () => {
            await alertWindow.verifyNewWindow("New Window")
        })
        await test.step("Step 7 - I click on New Window Message and I verify whether New Window Message is opened", async () => {
            await alertWindow.verifyNewWindowMessage("New Window Message")
        })
    })

    test("TC07 - Verify Alerts", async ({ page }) => {
        let alertWindow: TeamQAAlertWindowPage = new TeamQAAlertWindowPage(page)
        await test.step("Step 1 - I click on Alerts, Frame & Windows", async () => {
            await alertWindow.clickAlertsFramesWindows();
        })
        await test.step("Step 2 - I verify Alerts, Frame & Windows page is opened", async () => {
            await alertWindow.verifyPageOpened("Alerts, Frame & Windows");
        })
        await test.step("Step 3 - I click on Alerts tab", async () => {
            await alertWindow.elementsTabSelection("Alerts");
        })
        await test.step("Step 4 - I verify Alerts page is opened", async () => {
            await alertWindow.verifyPageOpened("Alerts");
        })
        await test.step("Step 5 - I click on Alert Button and I verify alert opened", async () => {
            await alertWindow.verifyAlertWindow();
        })
        await test.step("Step 6 - I click on timer Alert Button and I verify timer alert opened ", async () => {
            await alertWindow.verifyTimerAlertWindow();
        })
        await test.step("Step 7 - I click on Confirm Alert Button and I verify Confirm alert opened ", async () => {
            await alertWindow.verifyConfirmAlertWindow();
        })
        await test.step("Step 8 - I click on timer Alert Button and I verify Prompt alert opened ", async () => {
            await alertWindow.verifyPromptAlertWindow("Test");
        })
    })

    test("TC08 - Verify Elements-> File Upload", async ({ page }) => {
        let elements: TeamQAElementPage = new TeamQAElementPage(page)
        await test.step("Step 1 - I click on Elements", async () => {
            await elements.clickElements();
        })
        await test.step("Step 2 - I click on Upload and Download tab", async () => {
            await elements.elementsTabSelection("Upload and Download");
        })
        await test.step("Step 3 - I verify Upload and Download page is opened", async () => {
            await elements.verifyElementPageOpened("Upload and Download");
        })
        await test.step("Step 4 - I click on Choose file", async () => {
            await elements.fileUpload()
        })
    })

    test("TC09 - Verify Elements-> File Download", async ({ page }) => {
        let elements: TeamQAElementPage = new TeamQAElementPage(page)
        await test.step("Step 1 - I click on Elements", async () => {
            await elements.clickElements();
        })
        await test.step("Step 2 - I click on Upload and Download tab", async () => {
            await elements.elementsTabSelection("Upload and Download");
        })
        await test.step("Step 3 - I verify Upload and Download page is opened", async () => {
            await elements.verifyElementPageOpened("Upload and Download");
        })
        await test.step("Step 4 - I click on Choose file", async () => {
            await elements.fileDownload()
        })
    })

    test("TC10 - Verify Interactions-> Drag and Drop", async ({ page }) => {
        let interactions: TeamQAInteractionsPage = new TeamQAInteractionsPage(page)
        await test.step("Step 1 - I click on Interactions", async () => {
            await interactions.clickInteractionsWindows();
        })
        await test.step("Step 2 - I verify Interactions page is opened", async () => {
            await interactions.verifyPageOpened("Interactions");
        })
        await test.step("Step 3 - I click on Droppable tab", async () => {
            await interactions.elementsTabSelection("Droppable");
        })
        await test.step("Step 4 - I verify Droppable page is opened", async () => {
            await interactions.verifyPageOpened("Droppable");
        })
        await test.step("Step 5 - ", async () => {
            const srcElement = "#draggable"
            const dscElement = "#simpleDropContainer #droppable"
            await interactions.verifyDragAndDrop(srcElement, dscElement);
        })
    })

    test("TC11 - Verify Widgets-> Date Picker", async ({ page }) => {
        let widgets: TeamQAWidgetsPage = new TeamQAWidgetsPage(page)

        await test.step("Step 1 - I click on Widgets", async () => {
            await widgets.clickWidgetsWindows();
        })
        await test.step("Step 2 - I verify Widgets page is opened", async () => {
            await widgets.verifyPageOpened("Widgets");
        })
        await test.step("Step 3 - I click on Date Picker tab", async () => {
            await widgets.elementsTabSelection("Date Picker");
        })
        await test.step("Step 4 - I verify Alerts page is opened", async () => {
            await widgets.verifyPageOpened("Date Picker");
        })
        await test.step("Step 5 - ", async () => {
            //Date format DD/MM/YYYY
            const date = "16/07/1991"
            await widgets.verifyDatePicker(date);
        })
    })


    test("TC12 - Connect to MySQL Database and Execute Query", async ({ page }) => {
        let db: mysqlpool = new mysqlpool()

        await test.step("Step 1 - I connect to MySQL Database and Execute a query", async () => {
            let sqlQuery = "SELECT * FROM userdb.student;"
            //var res: string[];
            const res = db.executeQuery(sqlQuery);
            console.log('testcases result : ' + res)
            // expect(result).toContain("Test1")
            //console.log('in Testcases : \n ' + results)
        })
    })
})
