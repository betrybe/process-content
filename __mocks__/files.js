const lsFiles =
  `priv/markdown_templates/content/back-end/sql/table-management/_index.html.md\npriv/markdown_templates/content/back-end/sql/table-management/_index.yaml`;

const rawContent =
  `---
block: introducao-a-sql
module: back-end
category: chapter
type: hard_skill
title: "Manipulando tabelas"
date: 2020-01-11
weight: 88
week: 20
day: 4
course: true
---% `

module.exports = {
  lsFiles,
  rawContent
}