import AjaxRequest from "@typo3/core/ajax/ajax-request.js";
import Ai3ApiBase from "@wegewerk/ai3core/ai3api.js";

class Ai3Api extends Ai3ApiBase {
  generateFaq(pageId, recordUid, language) {
      return new AjaxRequest(TYPO3.settings.ajaxUrls['ai3_faq_generate'])
          .post({
              page_id: pageId,
              record_uid: recordUid,
              language: language
          });
  }
}

export {Ai3Api as default};
