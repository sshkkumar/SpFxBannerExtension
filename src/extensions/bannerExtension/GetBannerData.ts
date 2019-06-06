import {
  SPHttpClient,
  SPHttpClientResponse,
  ISPHttpClientOptions
} from "@microsoft/sp-http";

import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import { IBannerExtensionApplicationCustomizerProperties } from "./ApplicationCustomizerProperties";
import { IList, ILists } from "./List";


class BannerData {
  public getBannerItem(
    context: ApplicationCustomizerContext,
    properties: IBannerExtensionApplicationCustomizerProperties
  ): Promise<IList> {

    return this.getBannerDataFromList(context, properties)
      .then(response => {
        return new Promise((resolve, reject) => {
          let items: IList[] = response.value;
          resolve(items[0]);
        });
      });
  }

  private getBannerDataFromList(
    context: ApplicationCustomizerContext,
    properties: IBannerExtensionApplicationCustomizerProperties
  ): Promise<ILists> {
    let webUrl = properties.BannerSiteUrl; //context.pageContext.web.absoluteUrl;
    let requestUrl = webUrl.concat(`/_api/web/lists/GetByTitle('BannerDetails')/Items?$filter=SourceSiteUrl eq '` + context.pageContext.web.absoluteUrl + `'&$orderby= Modified asc`);

    return context.spHttpClient
      .get(requestUrl, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }
}

export default BannerData;
