$(function() {
  chrome.storage.sync.get({
    isUseGithub: true,
    isAddReferenceTask: true,
    isHideJenkinsComments: true
  }, function(items) {
    if (items.isUseGithub) {
      if (items.isAddReferenceTask) {
        $(".tabnav.tabnav-pr").on("click", "a", function() {
          repeatWorks(setPullRequestTask);
        })
        repeatWorks(setPullRequestTask);
      }

      if (items.isHideJenkinsComments) {
        $(".tabnav.tabnav-pr").on("click", "a", function() {
          repeatWorks(hideJenkinsComments);
        })
        repeatWorks(hideJenkinsComments);
      }
    }
  });
})

function repeatWorks(work) {
  $.each([0, 1, 2, 3], function(index, val) {
    setTimeout(work, val * 1000);
  });
}

function hideJenkinsComments() {
  $("a[href='/temona-jenkins']").each(function(index, e) {
    $(e).parents('.timeline-comment-wrapper.discussion-item-review').remove();
    $(e).parents('.inline-comments.js-inline-comments-container').remove();
  })
}

function setPullRequestTask() {
  if ($('.backlog-id').length > 0) {return}

  var title = $(".gh-header-title .js-issue-title").text();
  var branch = $(".current-branch .css-truncate-target").text()
  var backlogId = getBacklogId(title, branch);

  if (backlogId) {
    $(".gh-header-title").append(getBacklogLink(backlogId, 23));
  }
}

function getBacklogId(title, branch) {
  var backlogId = "";
  if (title) { backlogId = (title.match(/UKOKKEI-(\d+)/) || [])[1] }
  if (branch && !backlogId) { backlogId = (branch.match(/(\d+)$/) || [])[1] }
  return backlogId;
}

function getBacklogLink(backlogId, fontSize) {
  var link = "https://temona.backlog.jp/view/UKOKKEI-" + backlogId;
  return "<span class='backlog-id' style='font-size: " + fontSize +
    "px;'><a href='" + link + "' target='_blank'> #backlog link</a></span>";
}
