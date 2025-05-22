# Chrome extensions (not published in Chrome store)
<div align="center">
  <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG9mMGcwNzA3and6NTd5d3R6YW4wbWliN3JtcmJwN3J3NDUwdWh1aiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/qt73FYHjuXqAj241m8/giphy.webp" width="200" alt="build animation">
</div>
```mermaid

flowchart TD
  ENTRY(["sh ./build_all.sh"])
  ENTRY --> CHILD1
  ENTRY --> CHILD2
  CHILD1 --> BUILD["copies resulted build into ./builds/{$dir_name}"]
  CHILD2 --> BUILD
  BUILD --> CHROME_DEV_MODE["Enable dev mode in chrome"]
  CHROME_DEV_MODE --> CHROME_EXT["Go to chrome extensions and add manualy any extenstion from ./builds/{$dir_name}"]
  WARNING["Check for manifest.json file by adding extension manually!"]
```