import { expect } from "@playwright/test";
import { Page } from "playwright-core";
import Environment from "../Environment/environment";
import config from "../playwright.config";

export class TeamQAAlertWindowPage {
    private page: Page;
    constructor(page: Page) {
        this.page = page
    }

    //Locators
    browserWindows = async () => this.page.$('h5:has-text("Alerts, Frame & Windows")')
    elementsTitle = async () => await this.page.textContent('div[class="main-header"]')
    elementsTitlebox = async (btn: string) => await this.page.$(`text=${btn}`)
    //Actions
    public async clickAlertsFramesWindows() {
        // to scroll down using mouse wheel
        let footer = this.page.locator('footer')
        const box = await footer.boundingBox()
        if (box) {
            const y = box.y;
            await this.page.mouse.wheel(0, y)
        }
        const ele = await this.browserWindows()
        if (ele != null)
            await ele.click()
        else throw new Error("No element found")
    }

    public async verifyPageOpened(titleName: string) {
        const ele = await this.elementsTitle()
        console.log("Page title : " + ele.trim())
        if (ele != null)
            expect(ele).toBe(`${titleName}`)
        else throw new Error(titleName + " page not landed!!!")
    }

    public async elementsTabSelection(tab: string) {
        if (tab === 'Alerts') {
            const ele = await this.page.$(`text="${tab}"`)
            await this.page.waitForSelector(`text=${tab}`)
            if (ele != null)
                await ele.click()
            else throw new Error(tab + " No such tabs are found")
        } else {
            const ele = await this.elementsTitlebox(tab)
            await this.page.waitForSelector(`text=${tab}`)
            if (ele != null)
                await ele.click()
            else throw new Error(tab + " No such tabs are found")
        }
    }
    public async verifyElementPageOpened(titleName: string) {
        const ele = await this.elementsTitle()
        console.log("Page title : " + ele.trim())
        if (ele != null)
            expect(ele).toBe(`${titleName}`)
        else throw new Error(titleName + " page not landed!!!")
    }

    public async verifyWhetherNewTabIsOpened(btn: string) {
        // Get page after a specific action (e.g. clicking a link)
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.page.click(`text="${btn}"`) // Opens a new tab
        ])
        await newPage.waitForLoadState();
        console.log("new tab URL value : " + newPage.url());
        expect(newPage.url()).toContain("sample")
        await newPage.close()
    }

    public async verifyNewWindow(btn: string) {
        const [newWindow] = await Promise.all([this.page.context().waitForEvent('page'), this.page.click(`text="${btn}"`)])
        await newWindow.waitForLoadState();
        const allwindows = newWindow.context().pages()
        console.log('No of windows opened : ' + allwindows.length)
        allwindows.forEach(win => {
            console.log('new windows URL : ' + win.url())
        })
        await allwindows[1].bringToFront()
        expect(allwindows[1].url()).toContain("sample")
        await allwindows[1].close()
    }

    public async verifyNewWindowMessage(btn: string) {
        const [newWindow] = await Promise.all([this.page.context().waitForEvent('page'), this.page.click(`text="${btn}"`)])
        await newWindow.waitForLoadState();
        const allwindows = newWindow.context().pages()
        console.log('No of windows opened : ' + allwindows.length)
        allwindows.forEach(win => {
            console.log('new windows URL : ' + win.url())
        })
        await allwindows[1].bringToFront()
        expect(allwindows[1].url()).toContain("blank")
        await allwindows[1].close()
    }

    public async verifyAlertWindow() {
        const alert = this.page.locator("#alertButton");
        this.page.once("dialog", (dialog) => {
            console.log('Message : ' + dialog.message())
            dialog.accept("Ok")
        })
        await alert.click()
    }

    public async verifyTimerAlertWindow() {
        const alert = this.page.locator("#timerAlertButton");
        const [dialog] = await Promise.all([
            this.page.waitForEvent('dialog'),
            alert.click()
        ]);
        console.log('Message : ' + dialog.message())
        dialog.accept()
    }

    public async verifyConfirmAlertWindow() {
        const alert = this.page.locator("#confirmButton");
        this.page.once("dialog", (dialog) => {
            console.log('Alert Type : ' + dialog.type())
            console.log('Message : ' + dialog.message())
            dialog.dismiss()
        })
        await alert.click()
        await this.page.waitForSelector("#confirmResult")
        let confirmtext = await (await this.page.$("#confirmResult")).textContent()
        console.log('Ok Or Cancel ?: ' + confirmtext)
        expect(confirmtext).toStrictEqual("You selected Cancel")
    }

    public async verifyPromptAlertWindow(str : string) {
        const alert = this.page.locator("#promtButton");
        this.page.once("dialog", (dialog) => {
            console.log('Alert Type : ' + dialog.type())
            console.log('Message : ' + dialog.message())
            dialog.accept(str)
        })
        await alert.click()
        await this.page.waitForSelector("#promptResult")
        let confirmtext = await (await this.page.$("#promptResult")).textContent()
        console.log('Ok Or Cancel ?: ' + confirmtext)
        expect(confirmtext).toStrictEqual("You entered " + str)

      
    }

}