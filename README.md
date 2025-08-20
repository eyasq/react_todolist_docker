# React Todolist app

### Initial setup:

    Main page will have a form to input todos, and a div to display those todos.
    Functionalities to be added step-by-step
    1. Craete Form and Display components✅
    2. Lift up state and add completed, important flags✅
    3. seperate pages using Router✅
    4. integrate react-hook-form✅
    5. integrate zustand✅
    6. integrate localStorage✅
    7. add some async fetches✅
    8. settle on single soruce of truth
    9. basic styling, logo, make it an actual react webapp rather than some development feature testing thing
    10. integrate styled components
    11. refractor
    12. everything ready > learn docker, containerize

    //on mount -> feed todos from localStorage into store

    //notes:
    utils.js deprecated > using zustand persist middleware to add to localStorage

    ~~problems:
    multiple sources of truth (zustand store, locastorage, useState)
    need to pick one source of truth and sync with localstorage
    make persistence automatic with the call adding to zustand store syncing with localstorage~~
    
    decesions:
    1. use hookform instead of form
    2. use zustand store instead of state
    