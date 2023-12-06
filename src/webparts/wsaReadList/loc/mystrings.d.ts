declare interface IWsaReadListWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppLocalEnvironmentOffice: string;
  AppLocalEnvironmentOutlook: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  AppOfficeEnvironment: string;
  AppOutlookEnvironment: string;
  UnknownEnvironment: string;
  NumberOfItemsPerPageLabel: string;
  NumberOfItemsPerLoadLabel: string;
  ListTitlesLabel: string;
}

declare module 'WsaReadListWebPartStrings' {
  const strings: IWsaReadListWebPartStrings;
  export = strings;
}
