*** Settings ***
Documentation    A resource file with reusable keywords and variables.
...
...        The system specific keywords created here form our own
...        domain specific language. They utilize keywords provided
...        by the imported SeleniumLibrary.
Library    SeleniumLibrary

*** Variables ***
${URL}        localhost:3000
${BROWSER}    Chrome
${DELAY}      0

*** Keywords ***

Input Username
    [Arguments]    ${username}
    Input Text     username_field    ${username}

Input Chat Message
    [Arguments]    ${chatmessage}
    Input Text     chatmessage_field    ${chatmessage}

Send Message
    Click Button    sendmessage_button




