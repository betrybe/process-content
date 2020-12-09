<div class="list-group container">
  <span class="divider"></span>

  <%= for {{block, block_order}, chapters} <- course_solution_pages_grouped_by_block() do %>
    <div class="list-group-item list-group-item-action text-left block-title">
      <div class="row">
        <div class="col-md-12">
          <strong>Bloco <%= block_order %>: <%= block_title(block) %></strong>
        </div>
      </div>
    </div>
    <%= for chapter <- Enum.sort_by(chapters, &(&1.content.chapter), &>=/2) do %>
      <%= link to: handle_path(chapter), class: "list-group-item list-group-item-action text-left chapter-title" do %>
        <div class="row">
          <div class="col-md-1">
            <%= Map.get(chapter.content, :chapter) %>
          </div>

          <div class="col-md-8">
            <%= chapter.title %>
          </div>

          <div class="col-md-1 text-right index--small-right">
            <%= chapter.weight %>
          </div>
        </div>
      <% end %>
    <% end %>

    <span class="divider"></span>
  <% end %>
</div>
