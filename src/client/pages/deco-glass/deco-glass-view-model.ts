import { PageViewModel, template, route, components } from "@nivinjoseph/n-app";
import { Routes } from "../routes";
import "./deco-glass-view.scss";
import { IntroSectionViewModel } from "./components/intro-section/intro-section-view-model";
import { MainHeaderViewModel } from "./components/main-header/main-header-view-model";
import { TopCoverViewModel } from "./components/top-cover/top-cover-view-model";
import { DrinksSectionViewModel } from "./components/drinks-section/drinks-section-view-model";
import { DrinksLogoViewModel } from "./components/drinks-logo/drinks-logo-view-model";
import { EnvironmentViewModel } from "./components/environment/environment-view-model";
import { SolutionViewModel } from "./components/solution/solution-view-model";
import { PromiseSectionViewModel } from "./components/promise-section/promise-section-view-model";
import { HelpSectionViewModel } from "./components/help-section/help-section-view-model";
import { InspireViewModel } from "./components/inspire/inspire-view-model";
import { DiscoverMoreViewModel } from "./components/discover-more/discover-more-view-model";
import { FooterViewModel } from "./components/footer/footer-view-model";







@template(require("./deco-glass-view.html"))
@route(Routes.decoGlass)
@components(IntroSectionViewModel, MainHeaderViewModel, TopCoverViewModel, DrinksSectionViewModel, DrinksLogoViewModel,
    EnvironmentViewModel, SolutionViewModel, PromiseSectionViewModel, HelpSectionViewModel, InspireViewModel,
    DiscoverMoreViewModel, FooterViewModel)
export class DecoGlassViewModel extends PageViewModel
{

}