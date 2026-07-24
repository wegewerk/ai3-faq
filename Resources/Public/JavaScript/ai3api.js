import AjaxRequest from "@typo3/core/ajax/ajax-request.js";

class Ai3Api {
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
