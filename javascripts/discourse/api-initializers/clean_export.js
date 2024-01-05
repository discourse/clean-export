import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.15.0", (api) => {
  api.addPostAdminMenuButton(() => {
    return {
      action: ({ topic_id, post_number }) => {
        const w = window.open(`/t/-/${topic_id}/print?post_number=${post_number}`, "_blank");

        w.onbeforeprint = () => {
          const doc = w.document;

          const style = doc.createElement("style");
          style.type = "text/css";
          style.innerHTML = `
            /* hide anything except the post we want to print */
            header,
            footer,
            [role='navigation'],
            [itemprop='position'],
            [role='complementary'],
            [itemprop='interactionStatistic'],
            .crawler-linkback-list,
            .crawler-post:not(#post_${post_number}) {
              display: none !important;
            }

            /* hide the creation date of the post */
            .crawler-post-infos time[itemprop='datePublished'] {
              display: none !important;
            }

            /* show the last edit date of the post */
            .crawler-post-infos meta[itemprop='dateModified'] {
              display: inline-block !important;
              &::after { content: attr(content); }
            }
          `;

          doc.head.appendChild(style);
        };
      },
      icon: "print",
      className: "clean-export",
      label: themePrefix("clean_export.label"),
    };
  });
});
