const { customtestAssignment } = require('./Utils/CustFixAssignUtils');
const {expect} = require('@playwright/test');


customtestAssignment("Custome Fixture Assignment", async ({ authenticatedPage, createEvent }) => {

    await authenticatedPage.goto("https://eventhub.rahulshettyacademy.com/events");
    const eventId = await createEvent.data.id;
    const eventNmae = await createEvent.data.title;
    console.log(eventId);
    console.log(eventNmae);
    await expect(authenticatedPage.getByText(eventNmae)).toBeVisible();

})