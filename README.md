# Nfterify_Mern_Stack

Introduction (MVP)


**Tell us about what you were aiming to build**? 
A Mern Stack web application that can be used by a brand to craete digital 'clothing items' where each piece of clothing has a set number of items.
Each item is assigned with a mintUID that is unique. This mintUID can then be used by customers of role 'user' to claim the 'NFT' into their wallet. At current the appplicaton hasn


**What were the limitations to the project**? 
I only had a few weeks to complete this project, so time was limted. Another factor was my lack of familiarity with react; this was my first full-stack react-based web application. Because of these two constraints, I ended up 'bedroom hacking' a few features and not adhering to recommended practises.I was following the Gitflow Workflow as far as best practise was concerned.Because the MVP hasn't been fully completed,the main branch is empty and the Dev branch only has a few completely functional features. feature_ConnectingBackend  is the most up to date branch and links the Clientside to the backend.

**How would you have improved on the code?** *
The application's authentication and authorization were 'bedroom hacked.' To do this, I could have used a Session+ state management system. I'm looking into migrating the project to the Next.js framework, which leverages next-auth to provide easy, flexible, and secure authentication as well as role-based access management. Next-auth also has a social login option, which I want to use to completely replace the registration and login pages. Social logins provide numerous security benefits, as well as preventing my application from being spammed with a large number of random users via the registration page.

My experience with mongoose on the backend when creating queries was not pleasant; I had to make many database calls to retrieve the data I needed. I'd like to switch to prisma ORM, which is well-known for its query builder. Furthermore, because my programme is data-driven, it is critical that I grasp the data's structure as I maintain and develop new features. Prisma accomplishes this by enforcing a schema that allows you to construct models and relationships.

I made every effort to prevent prop drilling, but it will become unavoidable as the app grows in size, necessitating the addition of state management.

Architecture - https://structurizr.com/share/71798

**MVP Requirements***

1.)The Streetwear brand owner (admin) can add items(NFT) to an collection available for minting

2.)Each item(NFT) in a digital collection has a unique identifier so that it can be put onto the physical version of the item to link them

3.)End user has a wallet listing all the clothing items minted

4.)Brand owner can see a list of all the unique identifiers and see the mint status of each item

5.)Each item(NFT) has metadata consisting of a picture, description, Number of items per size



**How to run** -

1.) Git clone Repository and checkout to branch feature_ConnectingBackend 

2.) navigate to ./server --> npm install and then npm start

3.) in another terminal navigate to ./client/nfterify --> npm install and then npm start navigate to ./client/nefterify --> npm install and then npm start

4.) login as a brand jehucal@gmail.com:a

5.) Create an item. Refresh page for it to appear in wallet and take note of a particular mintUID

6.) login as a user appuser@gmail.com:appuser

7.) enter in the mintUID corrosponding to an item and once 'minted' you can refresh and item should appear in wallet.

You can also create a new account but its not recommended for testing purposes, when doing so you can input the creator pass 'jehucal20' to make a brand account otherwise leave empty for regular user



Material tailwind Css library - https://material-tailwind.com/
Tailwind css
Express
React
Bootstrap
Node Js
