const ExcelJS = require('exceljs');
const { test, expect } = require('@playwright/test');

// By Handling await
async function writeExcel(ActualText, ReplacedText, colChange, FilePath) {

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(FilePath);
    const worksheet = workbook.getWorksheet("Sheet1");

    const output = await readExcel(worksheet, ActualText)

    const cell = worksheet.getCell(output.row, output.column + colChange.colChange);
    cell.value = ReplacedText;
    await workbook.xlsx.writeFile(FilePath);
}

async function readExcel(worksheet, ActualText) {
    const output = { row: 0, column: 0 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            //console.log(cell.value);
            if (cell.value == ActualText) {
                output.row = rowNumber;
                output.column = colNumber;
            }
        })
    })
    return output;
}


test("Upload & Download Excel file", async ({ page }) => {

    const oldText = "Mango";
    const newText = "600";
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadFile = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    await downloadFile;
    await writeExcel(oldText, newText, { rowChange: 2, colChange: 2 }, "C:/Users/win/Downloads/download.xlsx");
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("C:/Users/win/Downloads/download.xlsx");
    const textLocator = page.getByText(oldText);
    const desiredRow = page.getByRole('row').filter({ has: textLocator });
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(newText);

});




















// By Handling Promise
// const workbook = new ExcelJS.Workbook();
// workbook.xlsx.readFile("C:/Users/win/Downloads/DemoExcel.xlsx").then(function () {
//     const worksheet = workbook.getWorksheet("Sheet1");
//     worksheet.eachRow((row, rowNumber) => {
//         row.eachCell((cell, colNumber) => {
//             console.log(cell.value);
//         })
//     })
// })
