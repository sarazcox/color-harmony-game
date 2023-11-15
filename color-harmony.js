window.addEventListener("load", () => {

    // Order of colors for game solution
    const solutionArray = [
        "#D137B6", "#D248AF", "#D15AA7", "#D06CA1", "#CE7C9B", "#CD8D94", "#CE9F8C", "#CCB086", "#CBC17F",
        "#C936A7", "#C847A4", "#C658A0", "#C5689B", "#C37B97", "#C28C92", "#C09D8F", "#BFAD8B", "#BDBF86",
        "#BF3599", "#BD4697", "#BB5596", "#B86795", "#B67794", "#B48892", "#B29991", "#B0AA8F", "#AEBA8E",
        "#B4348A", "#B2448C", "#AF548C", "#AC658F", "#A9758F", "#A68690", "#A39692", "#A1A693", "#9EB796",
        "#AA327C", "#A6427F", "#A25283", "#A06288", "#9B728C", "#998291", "#949395", "#92A398", "#8DB39C",
        "#9E316D", "#9B4174", "#96507B", "#926082", "#8F7088", "#8B8090", "#878E97", "#829F9D", "#7FAEA5",
        "#94305E", "#903E67", "#8A4E72", "#875D7C", "#816C85", "#7D7D8E", "#788C98", "#749BA3", "#6FABAD",
        "#892F4E", "#853E5C", "#7F4D68", "#7A5C74", "#756B82", "#70798F", "#6A899B", "#6597A8", "#60A7B4",
        "#802E40", "#7A3C4F", "#744A5F", "#6D586E", "#68687E", "#62778E", "#5C859C", "#5594AD", "#50A3BC"
    ];

    let shuffledArray = [];
    const cellElements = document.querySelectorAll(".cell");

    // Colors assigned to each cell
    function gameSolution() {
        cellElements.forEach((cell, index) => {
            cell.style.backgroundColor = solutionArray[index];
        });
    }

    // Shuffling colors for on the game grid
    function shuffleSolution() {
        let shuffledColors = solutionArray.sort(() => Math.random() - 0.5);
        assignColorsToCells();
        gameSolution();
    }

    function assignColorsToCells() {
        const cellElements = document.querySelectorAll(".cell");
        cellElements.forEach((cell, index) => {
            const color = solutionArray[index];
            cell.dataset.color = color;

            if (cell.style.backgroundColor === color) {
                cell.draggable = false;
                cell.classList.add('correct');
                addCheckmarkToCell(cell);
            } else {
                cell.draggable = true;
                cell.classList.remove('correct');
            }
        });
    }

    // Handle cells being dragged and dropped
    function handleDragStart(event) {
        event.dataTransfer.setData("text/plain", event.target.dataset.color);
        event.target.classList.add("dragging");
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnd(event) {
        event.target.removeAttribute("draggable");
    }

    // Adding a checkmark to the cells
    function addCheckmarkToCell(cell) {
        const checkmark = document.createElement("span");
        checkmark.innerHTML = "&#10003;";
        checkmark.classList.add("checkmark");
        cell.appendChild(checkmark);
    }

    function handleDrop(event) {
        event.preventDefault();
        const draggedColor = event.dataTransfer.getData("text/plain");
        const targetColor = event.target.dataset.color;

        event.target.style.backgroundColor = draggedColor;
        event.target.dataset.color = draggedColor;
        event.dataTransfer.setData("text/plain", targetColor);

        const draggedCell = document.querySelector(".dragging");
        draggedCell.style.backgroundColor = targetColor;
        draggedCell.dataset.color = targetColor;
        draggedCell.classList.remove("dragging");

        checkGameSolved();

        if (draggedColor === targetColor) {
            event.target.draggable = false;
            event.target.classList.add('correct');
            addCheckmarkToCell(event.target);
        } else {
            event.target.draggable = true;
            event.target.classList.remove('correct');
        }
    }

    function addDragAndDropListeners() {
        const cellElements = document.querySelectorAll(".cell");
        cellElements.forEach((cell) => {
            cell.addEventListener("dragstart", handleDragStart);
            cell.addEventListener("dragover", handleDragOver);
            cell.addEventListener("drop", handleDrop);
            cell.setAttribute("draggable", true);
            cell.addEventListener("ondragend", handleDragEnd);
        });
    }

    document.querySelector("#start").onclick = shuffleSolution;
    addDragAndDropListeners();
});