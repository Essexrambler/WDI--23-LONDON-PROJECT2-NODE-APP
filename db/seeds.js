const mongoose = require('mongoose');
const Firework = require('../models/firework');

mongoose.connect('mongodb://localhost/firestarters');

Firework.collection.drop();

Firework.create([
  {title: "Waltham Forest Fireworks Display", location: {lat: 51.5915734, lng: -0.015501}, locationName: "Waltham Forest", adultCostFrom: 0, childCostFrom: 0, underXFree: true, underXAge: 0, openTime: "6.30pm", startTime: "8pm", date:5/11/2016, url:  "https://www.walthamforest.gov.uk/content/waltham-forest-fireworks-night", otherInfo: "There will be a range of delicious food stalls on offer, with a bar area serving an array of beverages."},

  {title: "Alexandra Palace Fireworks Festival (Fri)", location: {lat: 51.5919308, lng: -0.1294108}, locationName: "Alexandra Palace", adultCostFrom: 6, childCostFrom: 4, underXFree: true, underXAge: 10, openTime: "4pm", startTime: "9pm", date:4/11/2016, url:  "http://www.fireworks.london", otherInfo: "As well as the return of the UK's largest German Bier festival, there's a Mexican Day of the Dead parade, Ice Skating and much more to keep you entertained."},

  {title: "Alexandra Palace Fireworks Festival (Sat)", location: {lat: 51.5919308, lng: -0.1294108}, locationName: "Alexandra Palace", adultCostFrom: 6, childCostFrom: 4, underXFree: true, underXAge: 10, date:5/11/2016, url:  "http://www.fireworks.london", otherInfo: "As well as the return of the UK's largest German Bier festival, there's a Mexican Day of the Dead parade, Ice Skating and much more to keep you entertained."},

  {title: "Harrow Fireworks Display", location: {lat: 51.5942277, lng: -0.3277085}, locationName: "Byron Recreation Ground", adultCostFrom: 6, childCostFrom: 4, underXFree: false, underXAge: 0, openTime: "12pm", startTime: "7.30pm", date:5/11/2016, url:  "http://www.harrowfireworks.co.uk", otherInfo: "Free until 4pm. Our forthcoming Harrow Fireworks display and Festival is going to be our largest event to date and is also themed around outer Space to provide wholesome family fun. Our event will feature a full size fun fair, our world food arena, a fully licensed bar, a family zone, cultural entertainment, DJs, a huge marquee, a business zone, the trade zone and a 20 minute fireworks display in time with space themed music"},

  {title: "Finchley Cricket Club Fireworks", location: {lat: 51.5947251, lng: -0.1888886}, locationName: "Finchley Cricket Club", adultCostFrom: 5, childCostFrom: 5, underXFree: false, underXAge: 0, openTime: "7pm", startTime: "7pm", date:5/11/2016, url:  "https://www.facebook.com/events/1303585306341887/", otherInfo: "Family tickets available. Giant Bonfire, Spectacular Fireworks, Yummy Food and Great Music"},

  {title: "Wildfire Bonfire and Fireworks", location: {lat: 51.6069539, lng: -0.1293896}, locationName: "Scout Park, Bounds Green", adultCostFrom: 5, childCostFrom: 4, underXFree: true, underXAge: 6, openTime: "5pm", startTime: "7.30pm", date:5/11/2016, url:  "https://wildwolfesu.org/", otherInfo: "Kids' games, Norwegian waffles and a cracking bonfire make this an annual favourite for Bounds Green"},

  {title: "Clissold Park Fireworks Display", location: {lat: 51.5594423, lng: -0.0880452}, locationName: "Clissold Park", adultCostFrom: 8.50, childCostFrom: 3.50, underXFree: false, underXAge: 0, openTime: "5.30pm", startTime: "7pm", date:5/11/2016, url:  "https://www.eventbrite.co.uk/e/clissold-park-fireworks-display-tickets-27676631550", otherInfo: "This year's theme is 'animals', and residents are encouraged to channel their wild side and dress up as their favorite animals- be it Simba from 'The Lion King', Shere Khan from 'The Jungle Book' or just a cheeky monkey!"},

  {title: "Highgate School Fireworks Festival - Early Show", location: {lat: 51.5720425, lng: -0.1517}, locationName: "Highgate School", adultCostFrom: 15, childCostFrom: 10, underXFree: false, underXAge: 0, openTime: "4pm", startTime: "6pm", date:5/11/2016, url:  "http://highgatepawebsite.wixsite.com/highgatepa/fireworks", otherInfo: "Highgate School live student bands and DJ, fairground rides, Megabooth photo taxi, Go Get Glitter, Mr Marvel, Fragers Gamers bus, face painting and much much more"},

  {title: "Highgate School Fireworks Festival - Late Show", location: {lat: 51.5720425, lng: -0.1517}, locationName: "Highgate School", adultCostFrom: 15, childCostFrom: 10, underXFree: false, underXAge: 0, openTime: "7pm", startTime: "9pm", date:5/11/2016, url:  "http://highgatepawebsite.wixsite.com/highgatepa/fireworks", otherInfo: "Highgate School live student bands and DJ, fairground rides, Megabooth photo taxi, Go Get Glitter, Mr Marvel, Fragers Gamers bus, face painting and much much more"},

  {title: "Battersea Park Fireworks", location: {lat: 51.480744, lng: -0.1616171}, locationName: "Battersea Park", adultCostFrom: 8, childCostFrom: 8, underXFree: true, underXAge: 10, openTime: "6pm", startTime: "8pm", date:5/11/2016, url:  "http://enablelc.org/fireworks", otherInfo: "This year’s display will be set to music made by legends, fired by the award-winning Jubilee Fireworks and hosted by Christian Williams, Radio Presenter for Virgin Radio UK."},

  {title: "Morden Park Fireworks", location: {lat: 51.480744, lng: -0.1616171}, locationName: "Morden Park", adultCostFrom: 8, childCostFrom: 8, underXFree: true, underXAge: 10, openTime: "5.15pm", startTime: "6.45pm & 8.30pm", date:5/11/2016, url:  "http://www.merton.gov.uk/news-events/events/fireworks.htm", otherInfo: "There are two themed performances: 6.45pm 'Magic' (more suitable for young children) and 8.30pm 'All Around the World', plus funfair, refreshments and stalls open until 10pm."},

  {title: "Beckenham Fireworks", location: {lat: 51.4038493, lng: -0.032951}, locationName: "Croydon Road Recreation Ground", adultCostFrom: 10, childCostFrom: 5, underXFree: false, underXAge: 0, openTime: "6pm", startTime: "7pm & 8.15pm", date:5/11/2016, url:  "http://www.beckenhamfireworks.com", otherInfo: "Family tickets available. We have a quiet display at 7pm (fireworks for smaller children / autism-friendly) and a main firework display at 8.15pm. Gates open on Croydon Road and Village Way in Beckenham at 6pm and there will be a funfair, food stalls and facepainting."},

  {title: "Wimbledon Park Fireworks", location: {lat: 51.4388785, lng: -0.2065367}, locationName: "Wimbledon Park", adultCostFrom: 8, childCostFrom: 8, underXFree: true, underXAge: 10, openTime: "5.15pm", startTime: "6.45pm & 8.30pm", date:3/11/2016, url:  "http://www.merton.gov.uk/news-events/events/fireworks.htm", otherInfo: "There are two themed performances: 6.45pm 'Magic' (more suitable for young children) and 8.30pm 'All Around the World', plus funfair, refreshments and stalls open until 10pm."},

  {title: "Crystal Palace Park Fireworks", location: {lat: 51.4193406, lng: -0.0718355}, locationName: "Crystal Palace Park", adultCostFrom: 7.5, childCostFrom: 5.10, underXFree: false, underXAge: 0, openTime: "6pm", startTime: "7pm & 8.30pm", date:5/11/2016, url:  "http://www.crystalpalacefireworks.co.uk/", otherInfo: "Family ticket available. Please note tickets will NOT be available to purchase on the gates and must be purchased before arrival."},

  {title: "Blackheath Fireworks", location: {lat: 51.4747361, lng: 0.0044441}, locationName: "Blackheath", adultCostFrom: 0, childCostFrom: 0, underXFree: true, underXAge: 0, openTime: "12pm", startTime: "8pm", date:5/11/2016, url:  "http://www.lewisham.gov.uk/inmyarea/events/whats-on/fireworks/Pages/default.aspx", otherInfo: "The display kicks off at 8pm, but the event also features a funfair (from midday) and food and drink stalls (from 5pm)."},

  {title: "Kingston Fireworks", location: {lat: 51.4056605, lng: -0.2839074}, locationName: "Kingsmeadow Athletics Stadium", adultCostFrom: 4, childCostFrom: 4, underXFree: true, underXAge: 5, openTime: "6.30pm", startTime: "8pm", date:5/11/2016, url:  "http://kingstonrotaryclub.org.uk/events/fireworks/", otherInfo: "You can be assured of a display full of colour, noise and excitement set to music, as well as children’s fairground rides, a wide range of refreshments, and music and fun provided by Radio Jackie DJs live in the arena before the big display."},

  {title: "Chiselhurst Fireworks", location: {lat: 51.4183139, lng: 0.0601349}, locationName: "Chiselhurst Recreation Ground", adultCostFrom: 7, childCostFrom: 4, underXFree: false, underXAge: 0, openTime: "6.30pm", startTime: "8pm", date:5/11/2016, url:  "http://www.rotary-ribi.org/clubs/page.php?PgID=549797&ClubID=702", otherInfo: "Family tickets available. Children's Funfair, Hog-roast and stalls. Glenlyn Academy dance group are also performing"},

  {title: "Guy Fawkes Night in Newham", location: {lat: 51.5568799, lng: 0.0196176}, locationName: "Wanstead Flats", adultCostFrom: 0, childCostFrom: 0, underXFree: true, underXAge: 0, openTime: "5.30pm", startTime: "7.30pm", date:5/11/2016, url:  "http://www.newham.gov.uk/fireworks", otherInfo: "Heart Radio’s DJ and presenter, Roberto, will be hosting the night of awe-inspiring fireworks that residents can expect to be better than ever before. The display will be cleverly choreographed to movie soundtracks we all know and love."},

  {title: "Guy Fawkes Festival and Fireworks", location: {lat: 51.6915613, lng: -0.0134727}, locationName: "The Royal Gunpowder Mills", adultCostFrom: 9.75, childCostFrom: 7.75, underXFree: true, underXAge: 3, openTime: "2pm", startTime: "7pm", date:5/11/2016, url:  "http://www.royalgunpowdermills.com/whats-and-events/guy-fawkes-fireworks/", otherInfo: "Family tickets available. Celebrate Bonfire Night with the fireworks display at the Royal Gunpowder Mills, Waltham Abbey, when the historic site comes alive with The Guy Fawkes Experience from 2pm onwards including Family Fun activities for children of all ages, bursts of theatre, 17th century characters, science shows, fun fair with rides, concluding  in a spectacular fireworks display. Last entry 6.30pm. Pre-Booking is advised. "},

  {title: "The Great Fire of London Fireworks", location: {lat: 51.5367627, lng: -0.0423534}, locationName: "Victoria Park", adultCostFrom: 0, childCostFrom: 0, underXFree: true, underXAge: 0, openTime: "6pm", startTime: "7pm", date:5/11/2016, url:  "https://www.facebook.com/events/345508569126688/", otherInfo: "350 years after the 'Great Fire of London', you can enjoy a spectacular display as the skies above Victoria Park are ablaze with light and colour in celebration of Fireworks Night."},

  {title: "Ealing Cricket Club Fireworks", location: {lat: 51.5184873, lng: -0.3005786}, locationName: "Ealing Cricket Club", adultCostFrom: 6, childCostFrom: 4, underXFree: false, underXAge: 0, openTime: "6pm", startTime: "7.45pm", date:5/11/2016, url:  "http://www.ealingcc.co.uk/", otherInfo: "The Display will be set to music featuring favourites from “the Pop World – USA style” and includes a laser display prior to the Fireworks."},

  {title: "Richmond Family Fireworks", location: {lat: 51.4666686, lng: -0.3068734}, locationName: "Richmond Athletic Ground", adultCostFrom: 8, childCostFrom: 5, underXFree: true, underXAge: 5, openTime: "6pm", startTime: "7.45pm", date:5/11/2016, url:  "http://www.the-raa.co.uk/fireworks", otherInfo: "The Display will be set to music featuring favourites from “the Pop World – USA style” and includes a laser display prior to the Fireworks."},

  {title: "Ravenscourt Park Fireworks", location: {lat: 51.4965851, lng: -0.2411513}, locationName: "Ravenscourt Park", adultCostFrom: 6, childCostFrom: 6, underXFree: true, underXAge: 5, openTime: "5pm", startTime: "7.15pm & 8.10pm", date:5/11/2016, url:  "http://www.lyric.co.uk/whats-on/production/fireworks-2016--ravenscourt-park/", otherInfo: "Offers a children's display at 7.15pm before the main event at 8.10pm, which will be choreographed to music. A funfair and food stalls will keep everybody happy between."},

  {title: "Bishops Park Fireworks", location: {lat: 51.4715741, lng: -0.2206753}, locationName: "Bishops Park", adultCostFrom: 6, childCostFrom: 6, underXFree: true, underXAge: 5, openTime: "5pm", startTime: "7.15pm & 8.10pm", date:5/11/2016, url:  "http://www.lyric.co.uk/whats-on/production/fireworks-2016--bishops-park/", otherInfo: "Offers a children's display at 7.15pm before the main event at 8.10pm, which will be choreographed to music. A funfair and food stalls will keep everybody happy between."},

  {title: "Dukes Meadows Fireworks Display", location: {lat: 51.4739274, lng: -0.2585804}, locationName: "Dukes Meadows Golf & Tennis Club", adultCostFrom: 6, childCostFrom: 3, underXFree: false, underXAge: 0, openTime: "4.30pm", startTime: "6pm & 8pm", date:5/11/2016, url:  "http://www.dukesmeadows.com/archive/fireworks-display-5th-november/", otherInfo: "We will have a number of food and drink offers both in the Clubhouse and outside on the terrace including a delicious hog roast and BBQ.  Live music from The Rollin Stoned will kick the evening off and Stevie Wyatt will DJ till close, so come and join the party!"},

  {title: "Cleveland Square Fireworks", location: {lat: 51.5141559, lng: -0.1824549}, locationName: "Cleveland Square", adultCostFrom: 10, childCostFrom: 5, underXFree: false, underXAge: 0, openTime: "6pm", startTime: "7.15pm", date:5/11/2016, url:  "http://www.clevelandsquare.org/events/", otherInfo: "Along with the spectacular fireworks set to music there is a BIG bonfire and a light show. We will have our Barbeque along with all its trimmings being freshly cooked on site nestled next to our Bar which is serving CSRA’s own recipe of mulled wine (it’s a sell out every year) along with red and white wine, beer and soft drinks."},

  {title: "Danson Park Fireworks", location: {lat: 51.4557694, lng: 0.1204169}, locationName: "Danson Park", adultCostFrom: 6, childCostFrom: 4, underXFree: true, underXAge: 5, openTime: "6pm", startTime: "8pm", date:5/11/2016, url:  "http://www.dansonparkfireworks.co.uk/", otherInfo: "Funfair, range of food stalls, ice cream vans and glow stick stalls."},

  {title: "Coram's Fields Community Firework Display", location: {lat: 51.5242085, lng: -0.1221155}, locationName: "Danson Park", adultCostFrom: 0, childCostFrom: 0, underXFree: true, underXAge: 0, openTime: "3pm", startTime: "5.15pm", date:4/11/2016, url:  "http://www.coramsfields.org/?q=node/292", otherInfo: "An early kick-off for London’s most central display, which is raising money for the Coram's Field charity. Get down from 3pm to enjoy the fairground rides and food stalls."},

  {title: "Allianz Park Fireworks", location: {lat: 51.6035188, lng: -0.2257937}, locationName: "Hendon", adultCostFrom: 8, childCostFrom: 5, underXFree: false, underXAge: 0, openTime: "6.30pm", startTime: "7.30pm", date:6/11/2016, url:  "http://www.allianzpark.com/allianz-park-fireworks-2016/", otherInfo: "Allianz Park will once again be welcoming Saracens fans and the local community to join us for our annual fireworks display."},

  {title: "Brent Fireworks", location: {lat: 51.5581627, lng: -0.2834899}, locationName: "Wembley Park", adultCostFrom: 0, childCostFrom: 0, underXFree: true, underXAge: 0, openTime: "NA", startTime: "6.30pm", date:6/11/2016, url:  "https://www.brent.gov.uk/fireworks", otherInfo: "Join us at and around Arena Square, Wembley Park for fireworks that promise to be an exciting fun family event with vibrant street entertainment from a number of performers, great street food to tickle your taste buds and an exciting fireworks display set to a top-secret soundtrack"},

  {title: "Fortismere Fireworks on the Field", location: {lat: 51.5938868, lng: -0.1540513}, locationName: "Fortismere School, Muswell Hill", adultCostFrom: 5, childCostFrom: 5, underXFree: true, underXAge: 5, openTime: "6pm", startTime: "7.30pm", date:3/11/2016, url:  "http://www.fsaevents.moonfruit.com/", otherInfo: "This year’s fireworks promises to be better than ever with stunning fireworks designed and fired by Titanium Fireworks, world famous for their outstanding displays for the Mayor of London’s New Year’s Eve parties and Hogmanay at Edinburgh Castle."},

  {title: "Totteridge Millhillians Fireworks Display", location: {lat: 51.6277251, lng: -0.1971731}, locationName: "Totteridge Green", adultCostFrom: 7, childCostFrom: 5, underXFree: true, underXAge: 4, openTime: "5pm", startTime: "7.40pm", date:4/11/2016, url:  "https://tmcc42.wufoo.com/forms/r1kgdpep0x8nsoh/", otherInfo: "Mulled wine, food stalls, a fairground and a bonfire will accompany this fireworks display. The bar will be open until nearly midnight, so make a night of it." },

  {title: "Barnes Sports Clubs Big Bonfire Night", location: {lat: 51.4762756, lng: -0.2493345}, locationName: "Barnes Cricket Club", adultCostFrom: 15, childCostFrom: 5, underXFree: false, underXAge: 0, openTime: "5.30pm", startTime: "7.45pm", date:5/11/2016, url:  "https://www.facebook.com/events/841417912624382/", otherInfo: "Go for plenty of food and drinks, a bonfire and (hurrah!) a good old-fashioned best Guy competition. Afterwards, there'll be a disco in the clubhouse till late." },

  {title: "Fireworks Night @ Farringtons School", location: {lat: 51.414303, lng: 0.0809233}, locationName: "Farringtons School, Chiselhurst", adultCostFrom: 6, childCostFrom: 5, underXFree: true, underXAge: 3, openTime: "6pm", startTime: "7.30pm", date:4/11/2016, url:  "http://london.carpediem.cd/events/668164-f-p-a-firework-night-display-at-farringtons-school-at-farringtons-school/", otherInfo: "As well as an AMAZING Firework Display, there will be a light stall offering everything from glow sticks to wands, a BBQ, candy floss, popcorn, a sweet cart, hot chocolate and cookies." },

  {title: "Fireworks Display at High Elms", location: {lat: 51.3476509, lng: 0.0670926}, locationName: "High Elms Golf Course, Downe", adultCostFrom: 8, childCostFrom: 5, underXFree: true, underXAge: 2, openTime: "6.30pm", startTime: "7.30pm", date:4/11/2016, url:  "http://www.bromley.gov.uk/site/scripts/events_info.aspx?eventID=2418", otherInfo: "Disco,dance act,live music from Alice Rogers. BBQ and refreshments." },

  {title: "Hayes Schools' Family Fireworks Display", location: {lat: 51.3783721, lng: 0.0214728}, locationName: "Hayes Primary School, Bromley", adultCostFrom: 6, childCostFrom: 4, underXFree: true, underXAge: 3, openTime: "5.30pm", startTime: "7pm", date:5/11/2016, url:  "http://www.bromley.gov.uk/site/scripts/events_info.aspx?eventID=2418", otherInfo: "Great family display for all ages! Pulled pork, hot dogs, mulled wine and beer, with glow products and barista coffees also available on site." },

  {title: "Family Fireworks Festival at St Mary Cray Recreation Ground", location: {lat: 51.3957065, lng: 0.107672}, locationName: "St Mary Cray Recreation Ground", adultCostFrom: 5, childCostFrom: 3, underXFree: false, underXAge: 0, openTime: "3pm", startTime: "TBC", date:12/11/2016, url:  "http://www.bromley.gov.uk/site/scripts/events_info.aspx?eventID=2418", otherInfo: "Lots of activities including a large family funfair, games, stalls and firework display." },

  {title: "Kenley Firework Spectacular", location: {lat: 51.3158476, lng: -0.0885014}, locationName: "Kenley Primary School, Croydon", adultCostFrom: 5, childCostFrom: 2.50, underXFree: false, underXAge: 0, openTime: "6.30pm", startTime: "TBC", date:4/11/2016, url:  "https://www.tickettailor.com/checkout/view-event/id/67234/chk/4a70/", otherInfo: "Come along to our Firework Spectacular! Back again for it's third year! Once again the professional display is from the Gala Fireworks, British Firework Champions 2016!" },

  {title: "Collier Row FC/Community Fireworks", location: {lat: 51.6055087, lng: -0.1514161}, locationName: "Forest Row Centre, Romford", adultCostFrom: 5, childCostFrom: 4, underXFree: false, underXAge: 0, openTime: "6pm", startTime: "TBC", date:6/11/2016, url:  "https://www.evensi.uk/collier-row-fccommunity-fireworks-event-forest-row-centre/18981352", otherInfo: "On the night: face painters/candy floss/pop corn/ BBQ/ refreshments and indoor bar will be open plus other stalls." },

  {title: "Havering Free Fireworks", location: {lat: 51.5549412, lng: 0.1912879}, locationName: "Harrow Lodge Park, Hornchurch", adultCostFrom: 0, childCostFrom: 0, underXFree: true, underXAge: 0, openTime: "2pm", startTime: "8.30pm", date:12/11/2016, url:  "https://www3.havering.gov.uk/Pages/ServiceChild/Firework-displays-in-Havering.aspx", otherInfo: "Display and funfair." },

  {title: "Romford & Gidea Park RFC Firework Spectacular", location: {lat: 51.5688921, lng: 0.1658252}, locationName: "Crow Lane, Romford", adultCostFrom: 8.50, childCostFrom: 5, underXFree: false, underXAge: 0, openTime: "5pm", startTime: "8.30pm", date:4/11/2016, url:  "http://www.pitchero.com/clubs/romfordgideapark/news/firework-spectacular--4th-nov-1690399.html", otherInfo: "The borough's biggest firework spectacular." },

  {title: "Nelmes Primary Firework Night", location: {lat: 51.5794825, lng: 0.2312834}, locationName: "Nelmes Primary School, Hornchurch", adultCostFrom: 6, childCostFrom: 5, underXFree: true, underXAge: 3, openTime: "6.30pm", startTime: "TBC", date:4/11/2016, url:  "https://www3.havering.gov.uk/Pages/ServiceChild/Firework-displays-in-Havering.aspx", otherInfo: "Limited details available. Check directly with school on 07742 595 591." },

  {title: "Harold Wood Primary School Firework Display", location: {lat: 51.5877101, lng: 0.2313486}, locationName: "Harold Wood, Romford", adultCostFrom: 6, childCostFrom: 4, underXFree: true, underXAge: 4, openTime: "6.30pm", startTime: "TBC", date:4/11/2016, url:  "https://www3.havering.gov.uk/Pages/ServiceChild/Firework-displays-in-Havering.aspx", otherInfo: "Live DJ playing, hot food/refreshments/glow sticks available to purchase." },

  {title: "Maylands Golf Club Firework Display", location: {lat: 51.6071847, lng: 0.2470411}, locationName: "Maylands Golf Club, Romford", adultCostFrom: 6.50, childCostFrom: 3.50, underXFree: false, underXAge: 0, openTime: "3pm", startTime: "6.30pm", date:6/11/2016, url:  "https://www3.havering.gov.uk/Pages/ServiceChild/Firework-displays-in-Havering.aspx", otherInfo: "Fireworks display event with rides, stalls, BBQ, hog roast, facepainter, bouncy castle and DJ." },

  {title: "The King Alfred Fireworks Display", location: {lat: 51.5694331, lng: -0.1870822}, locationName: "The King Alfred School, Hampstead", adultCostFrom: 12, childCostFrom: 8, underXFree: false, underXAge: 0, openTime: "4.30pm", startTime: "7.45pm", date:12/11/2016, url:  "https://www.eventbrite.co.uk/e/king-alfred-fireworks-display-tickets-27897627555", otherInfo: "Expect delicious street food, a well stocked bar, wonderful mulled wine, loads of neon paraphernalia, kids entertainment, unbelievable living statues, dazzling firepoi, an incredible bonfire and the best fireworks display in North London." },

  {title: "Round Table Carshalton Fireworks", location: {lat: 51.3617587, lng: -0.1629992}, locationName: "Carshalton Park", adultCostFrom: 5, childCostFrom: 5, underXFree: true, underXAge: 5, openTime: "5pm", startTime: "7pm", date:5/11/2016, url:  "http://www.carshaltonfireworks.org.uk/", otherInfo: "Bonfire and live bands included." },

  {title: "Lord Mayor's Show and Fireworks", location: {lat: 51.5084438, lng: -0.1083787}, locationName: "Southbank", adultCostFrom: 0, childCostFrom: 0, underXFree: true, underXAge: 0, openTime: "9am", startTime: "5.15pm", date:12/11/2016, url: "https://lordmayorsshow.london/", otherInfo: "See website for full details about this annual event." }

], (err, fireworks) => {
  if(err) console.log("An error occured");
  if(fireworks) console.log(`${fireworks.length} fireworks created`);

  mongoose.connection.close();
});
