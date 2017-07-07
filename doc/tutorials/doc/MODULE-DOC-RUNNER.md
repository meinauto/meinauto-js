# The Module Doc Runner (MDR)

*Doc Runner Description*

The Doc Runner will try to run documentation generation for all declared modules

## Automated doc generated view in browser

    load system with get parameter "docs" like
    
    e.g.
    https://hostname.tld/?docs
    
to disable the doc runner send

    e.g.
    https://hostname.tld/?docs-stop

### Start live documentation coding

run watcher like described in README.md

    npm run dev-watch

if doc runner is loaded, the browser refreshes the documentation
from all documentated code changes as long as the mouse cursor 
is not over the browser window.
