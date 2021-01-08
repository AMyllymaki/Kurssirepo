*** Settings ***
Resource         resource.robot
Library          SeleniumLibrary
Library          DataDriver                 ./testi.csv
Test Teardown    Close Browser
Test Template    Create Exams From Excel

*** Test Cases ***
LoginWithUsernameAndPassword ${Username} ${Password}


*** Keywords ***
Create Exams From Excel
    [Arguments]                   ${Username}     ${Password}    
    Open Browser                  ${URL}          ${BROWSER}
    Maximize Browser Window
    Input Username                ${Username}
    Input Password                ${Password}
    Submit Credentials
    Sleep                         3s
    Page Should Contain Button    LogoutButton
    
