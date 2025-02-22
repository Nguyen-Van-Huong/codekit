document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("canvas");
  const container = document.querySelector(".left-container");
  const blocks = document.querySelectorAll(".block");
  const panelOpen = document.querySelector(".panel-open");
  const draggableBlocks = document.querySelectorAll(".panel-open .draggable");

  const blockData = {
    "Input-Output": ["in1", "in2", "in3", "out1", "out2", "out3"],
    "Sensors": ["sensors1", "sensors2", "sensors3"],
    "Motion": ["motion1", "motion2", "motion3"],
    "Control": ["control1", "control2", "control3"],
    "Logic": ["logic1", "logic2", "logic3"]
    };

  let isDragging = false;
  let startX, startY, scrollLeft, scrollTop;
  let isPanelOpen = false; // Biến trạng thái panel mở hay đóng

  draggableBlocks.forEach((block) => {
    block.setAttribute("draggable", "true");

    block.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", block.id);
    });
  });

  canvas.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    scrollLeft = container.scrollLeft;
    scrollTop = container.scrollTop;
    canvas.style.cursor = "grabbing";
  });

  blocks.forEach(block => {
    block.addEventListener("click", () => {
        const category = block.dataset.content; // Lấy nội dung của block được nhấn
        panelOpen.innerHTML = ""; // Xóa nội dung cũ của panel-open

        if (blockData[category]) {
            blockData[category].forEach(item => {
                const div = document.createElement("div");
                div.classList.add("draggable-block");
                div.setAttribute("draggable", "true");
                div.innerText = item;
                panelOpen.appendChild(div);
            });
        }

        panelOpen.style.display = "block"; // Hiển thị panel-open
    });
    });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".block") && !e.target.closest(".panel-open")) {
      panelOpen.style.display = "none";
      isPanelOpen = false;
    }
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging || e.target.closest(".panel")) return; // Không kéo khi đang ở panel

    let x = e.clientX - startX;
    let y = e.clientY - startY;
    container.scrollLeft = scrollLeft - x;
    container.scrollTop = scrollTop - y;
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    canvas.style.cursor = "grab";
  });
  document.querySelectorAll(".block").forEach((block) => {
    block.addEventListener("click", () => {
      panelOpen.style.display = "block";
    });
  });

  // Cho phép kéo block từ panel.open
  document.querySelectorAll(".draggable-block").forEach((block) => {
    block.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", block.innerText);
    });
  });

  // Cho phép thả block vào canvas
  canvas.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  canvas.addEventListener("drop", (e) => {
    e.preventDefault();
    const blockText = e.dataTransfer.getData("text/plain");
    const newBlock = document.createElement("div");
    newBlock.classList.add("draggable-block");
    newBlock.innerText = blockText;
    newBlock.style.position = "absolute";
    newBlock.style.left = `${e.offsetX}px`;
    newBlock.style.top = `${e.offsetY}px`;
    canvas.appendChild(newBlock);

    // Thêm sự kiện kéo thả cho block mới
    makeBlockDraggable(newBlock);
  });

  function makeBlockDraggable(block) {
    let isDragging = false;
    let offsetX, offsetY;
    let attachedBlocks = [];

    block.addEventListener("mousedown", (e) => {
      e.preventDefault(); // Ngăn thanh cuộn di chuyển
      e.stopPropagation(); // Ngăn sự kiện lan ra ngoài
      isDragging = true;

      // Lấy vị trí chuột so với khối
      offsetX = e.clientX - block.getBoundingClientRect().left;
      offsetY = e.clientY - block.getBoundingClientRect().top;

      block.style.cursor = "grabbing";

      // Xác định các khối phía dưới khối này
      attachedBlocks = getAttachedBlocks(block);
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;

      // Điều chỉnh vị trí block theo canvas, không bị lệch
      const newX = e.clientX - canvas.getBoundingClientRect().left - offsetX;
      const newY = e.clientY - canvas.getBoundingClientRect().top - offsetY;

      block.style.left = `${newX}px`;
      block.style.top = `${newY}px`;

      let offsetYDiff = block.offsetHeight; // Khoảng cách di chuyển của các khối phía dưới
      attachedBlocks.forEach((attachedBlock, index) => {
        attachedBlock.style.left = `${newX}px`;
        attachedBlock.style.top = `${newY + (index + 1) * offsetYDiff}px`;
      });
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
      block.style.cursor = "grab";
      checkForSnap(block);
    });
  }

  function getAttachedBlocks(block, collected = []) {
    const blocks = document.querySelectorAll(".draggable-block");

    blocks.forEach((otherBlock) => {
      if (otherBlock !== block && !collected.includes(otherBlock)) {
        const rect1 = block.getBoundingClientRect();
        const rect2 = otherBlock.getBoundingClientRect();

        if (
          Math.abs(rect1.left - rect2.left) < 10 &&
          Math.abs(rect1.bottom - rect2.top) < 10
        ) {
          collected.push(otherBlock);
          getAttachedBlocks(otherBlock, collected); // Đệ quy để lấy toàn bộ khối phía dưới
        }
      }
    });

    return collected;
  }

  function checkForSnap(block) {
    const blocks = document.querySelectorAll(".draggable-block");
    blocks.forEach((otherBlock) => {
      if (otherBlock !== block) {
        const rect1 = block.getBoundingClientRect();
        const rect2 = otherBlock.getBoundingClientRect();

        // Nếu block gần phía dưới block khác
        if (
          Math.abs(rect1.left - rect2.left) < 10 &&
          Math.abs(rect1.top - rect2.bottom) < 10
        ) {
          block.style.left = `${otherBlock.offsetLeft}px`;
          block.style.top = `${
            otherBlock.offsetTop + otherBlock.offsetHeight
          }px`;
        }
      }
    });
  }




});
