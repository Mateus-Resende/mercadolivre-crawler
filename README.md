# mercadolivre-crawler
An API that retrieves data from Mercado Livre's website


## Introduction

This API is intended to retrieve product data from Mercado Livre and return an array containing the results.

## Folder Architecture

The folder architecture was done following the patterns described in [Uncle Bob's Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html). There are five layers that each concern about a single part of the code: Main, Presentation, Domain, Infra, Data. This architecture was chosen to make the components more decoupled, provide interfaces to communicate with each other and make sure that the project is easily extensible. For instance, if another marketplace is now the source of the data, I only need to make sure that the infra layer that contains the new repository implements the same methods as the interface created. Thus, changing the dependency that I'm injecting inside my business logic and making sure that I don't need to touch it.

### Main Layer
The Main layer is responsible for building the project, just like a couple of LEGO bricks. These bricks are responsible to mount together the external libraries necessary for the project to run and the how the infra, data and presentation layer inject dependencies into one another. If the Main layer inject a dependency inside the Data layer, this dependency must implement all the methods that the interface is expecting to receive, and so on. In this layer, I initialize the app, configure logging, routing, and the Express Adapter to communicate with Express.

### Presentation Layer
This layer is responsible to make the communication between the Data layer and the results that the Main layer will receive. In this layer, I implemented the controller that receives the HTTP request, validates it and calls the Use Case from the Data layer to apply the business logic.

### Data Layer
Here, I implemented all the business logic responsible to call the Marketplace Repository, retrieve the results and return to the presentation layer.

### Domain layer
The Domain layer contains all the models and the Entities that are being used by the application.

### Infra Layer
Lastly, the Infra layer contains the repositories that are responsible to communicate with Mercado Livre's website, parse the data and return to the Data layer.

![Image of the architecture]
(architecture-planning.png)

## TDD

The project was built using TDD and making sure that each passing test results in a commit to the repository. Therefore, I have total control of everything that each feature or refactoring is actually covered by tests which gives me confidence to change things as I please.
