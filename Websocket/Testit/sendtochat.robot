*** Settings ***
Resource    resource.robot
Library     SeleniumLibrary
Library     DataDriver         ./testi.csv
Suite Setup       Setup
Suite Teardown    Close Browser
Test Template     Send Messages To Chat

*** Test Cases ***
Chat Bot Test   ${Message}


*** Keywords ***
Send Messages To Chat
    [Arguments]           ${Message}    
    Input Chat Message    ${Message}
    Send Message

Setup
    Set Selenium speed    1s
    Open Browser          ${URL}      ${BROWSER}
    Input Username        Chat_Bot
