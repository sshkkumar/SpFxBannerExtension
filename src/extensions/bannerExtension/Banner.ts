import {
  SPHttpClient,
  SPHttpClientResponse,
  ISPHttpClientOptions
} from "@microsoft/sp-http";

import{
   ApplicationCustomizerContext
}from '@microsoft/sp-application-base';

import {IBannerExtensionApplicationCustomizerProperties} from './ApplicationCustomizerProperties';

class Banner{

  public getBannerData(context: ApplicationCustomizerContext, properties: IBannerExtensionApplicationCustomizerProperties): Promise<any>{
      let webUrl =  properties.BannerSiteUrl;//context.pageContext.web.absoluteUrl;
      let requestUrl = webUrl.concat("/_api/web/GetFolderByServerRelativeUrl('SiteAssets')/Files('banner.json')/$value");

      return context.spHttpClient.get(requestUrl, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
          return response.json();
      });
    }
}

export default Banner;
