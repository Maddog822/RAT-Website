# Rent-a-Tech

Rent-a-Tech is a local tech help business for students, older adults, and home users. This repository holds the company website, where customers can browse services, book a tech, and sign up.

> **Status:** in development. The forms are demos and are not connected to a form service yet.

## Services

1. Computer Repair
2. Software and Virus Help
3. PC Building
4. Wifi and Networking
5. Phone and Tablet Repair
6. Mounting and Cable Management

## Pages

| Page | File |
| --- | --- |
| Home | `index.html` |
| Services | `services.html` |
| Booking | `booking.html` |
| Sign up | `signup.html` |
| Guide | `guide.html` |
| Map | `map.html` |
| Reviews | `review.html` |
| Help | `help.html` |
| Service pages | `Computer_Repair.html`, `Software_and_Virus.html`, `PC_Building.html`, `Wifi_and_Networking.html`, `Phone_and_Tablet_Repair.html`, `Mounting_and_Cable_Management.html` |

## Project structure

```
rent-a-tech/
  index.html
  services.html
  booking.html
  signup.html
  guide.html
  map.html
  review.html
  help.html
  Computer_Repair.html
  Software_and_Virus.html
  PC_Building.html
  Wifi_and_Networking.html
  Phone_and_Tablet_Repair.html
  Mounting_and_Cable_Management.html
  style.css      (all site styling, navy and white theme)
  script.js      (navbar highlighting and the home page carousel)
  images/
    logo.svg     (placeholder logo)
  README.md
  .gitignore
```

## Running the site locally

The site is plain HTML, CSS, and JavaScript, so nothing needs to be installed.

1. Download or clone this repository.
2. Open `index.html` in any web browser.

For easier editing, open the folder in VS Code and use the Live Server extension, which refreshes the page each time you save.

Keep all files together in one folder and don't rename them, because the pages link to each other by file name.

## Customizing

- **Colors:** change the values at the top of `style.css`.
- **Logo:** replace `images/logo.svg` with your own logo, keeping the same file name.
- **Contact info and social links:** edit the footer on each page.
- **Services and prices:** edit the tiles in `services.html` and the individual service pages.

## To do

- [ ] Replace placeholder text on the home, guide, map, review, and help pages
- [ ] Add real photos for the service tiles
- [ ] Connect the sign up and booking forms to a form service
- [ ] Write the terms and conditions page
- [ ] Add real reviews from customers
- [ ] Add a real map
- [ ] Publish the site and connect a domain

## Contributing

Work on changes in a separate branch and open a pull request so both of us can review them before they go live.

## License

All rights reserved. Add a license here if you decide to share the code.
