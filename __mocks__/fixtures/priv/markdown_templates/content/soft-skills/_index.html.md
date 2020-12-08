<div class="container soft-skill-container">
  <li class="list-group-item">
    <div class="row">
      <div class="col-md-3">
        <em>Competências</em>
      </div>
    </div>
  </li>

  <%= for {{chapter, chapters}, index} <- Enum.with_index(soft_skill_pages_grouped_by_section()) do %>
    <div class="accordion" id="soft-skill-<%= index %>">
      <div class="card">
        <div class="card-header">
          <a class="list-group-item list-group-item-action text-left" data-toggle="collapse"
            data-target="#soft-skill-<%= index %>-contents" aria-expanded="false"
            aria-controls="soft-skill-<%= index %>-contents" href="#">
            <div class="row">
              <div class="col-md-11">
                <i class="fas fa-angle-down rotate-icon"></i>
                <i class="fas fa-angle-up rotate-icon d-none"></i>&nbsp;
                <%= chapter.title %>
              </div>
              <div class="col-md-1 text-right index--small-right">
                <%= chapter.weight %>
              </div>
            </div>
          </a>
        </div>
        <div id="soft-skill-<%= index %>-contents" class="collapse" data-parent="#soft-skill-<%= index %>">
          <li class="list-group-item">
            <div class="row">
              <div class="col-md-4">
                <em>Tema</em>
              </div>
              <div class="col-md-8 text-left">
                <em>Título</em>
              </div>
            </div>
          </li>
          <%= for chapter <- chapters do %>
            <a class="list-group-item list-group-item-action text-left" href="<%= handle_path(chapter) %>">
              <div class="row">
                <div class="col-md-4">
                  <%= chapter.content.theme %>
                </div>
                <div class="col-md-7">
                  <%= chapter.title %>
                </div>
                <div class="col-md-1 text-right index--small-right">
                  <%= chapter.weight %>
                </div>
              </div>
            </a>
          <% end %>
        </div>
      </div>
    </div>
  <% end %>
</div>
