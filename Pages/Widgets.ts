import { expect } from "@playwright/test";
import { Page } from "playwright-core";
import Environment from "../Environment/environment";
import config from "../playwright.config";

export class TeamQAWidgetsPage {
    private page: Page;
    constructor(page: Page) {
        this.page = page
    }

    //Locators
    browserWindows = async () => this.page.$('h5:has-text("Widgets")')
    elementsTitle = async () => await this.page.textContent('div[class="main-header"]')
    elementsTitlebox = async (btn: string) => await this.page.$(`text=${btn}`)
    //Actions
    public async clickWidgetsWindows() {
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

    public async verifyDatePicker(entered_date: string) {
        let day = null;
        let month = null;
        let year = null;

        let entered_day = 16
        let entered_month = 7
        let entered_year = "1991"
        entered_year = String(entered_year)
        if (entered_day > 0 && entered_day <= 31) {
            day = String(entered_day)
        } else {
            throw new Error('Entered day is not valid')
        }

        if (entered_month > 0 && entered_month <= 12) {
            entered_month = entered_month - 1;
            month = String(entered_month)
        } else {
            throw new Error('Entered month is not valid')
        }

        let yearLenght = entered_year.length
        console.log('yearLenght' + yearLenght)
        let entered_yearInString = Number(entered_year)
        if (entered_yearInString > 0 && yearLenght === 4) {
            year = String(entered_year)
        } else {
            throw new Error('Entered year is not valid')
        }

        const ele = await this.page.$("#datePickerMonthYearInput")
        if (ele != null) {
            await ele.click()
            await this.page.waitForSelector('div.react-datepicker')
            const selected_year = await this.page.selectOption('.react-datepicker__year-select', year)
            const selected_month = await this.page.selectOption('.react-datepicker__month-select', month)
            const selected_day = await (await this.page.$(`div[class="react-datepicker__day react-datepicker__day--0${day}"]`)).click()

            const result = await (await this.page.$("#datePickerMonthYearInput")).inputValue()
            console.log("Result : Entered Date is : " + result)
            expect(result).toEqual("07/16/1991")
        }
        else { throw new Error(day + " No such tabs are found") }
    }
}

function delay(time: number) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}