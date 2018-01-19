module BootstrapDualSelect {
    class DualSelect {

        itemList: Array<ListItem> = new Array<ListItem>();
        id: string;
        search: boolean = true;
        classList: ClassObject = {
            ul: "list-group",
            li: "list-group-item",
            clicked: "active",
            selectBtn: "fa-chevron-left",
            unselectBtn: "fa-chevron-right",
        };
        selectedList: HTMLUListElement = document.createElement("ul");
        unselectedList: HTMLUListElement = document.createElement("ul");

        constructor(data: InitObject) {
            this.LoadList(data);
            try {
                this.SetOptions(data);
                this.BuildSelector();
            } catch (e) {
                console.log(e);
            }
        }

        LoadList = (options: InitObject) => {
            options.data.forEach((value, index, arr) => {
                let category = value.category || ""; // null check
                let item: ListItem = new ListItem(value.name, category);
                this.itemList.push(item);
            });
        }
        SetOptions = (options: InitObject) => {
            if (!options.id) {
                throw new Error("Cannot have empty id property");
            } else {
                this.id = options.id;
                this.search = options.search || true;
            }
            if (options.classList) {
                this.classList = options.classList;
            }
        }
        SelectItems = () => {
            let queuedItems: Array<ListItem> = this.GetHighlightedItems(false);
            queuedItems.forEach(function (value, index, arr) {
                arr[index].selected = true;
            });
            this.UpdateItems(queuedItems, true);
        }
        UnselectItems = () => {
            let queuedItems: Array<ListItem> = this.GetHighlightedItems(true);
            queuedItems.forEach(function (value, index, arr) {
                arr[index].selected = false;
            });
            this.UpdateItems(queuedItems, false);
        }
        GetHighlightedItems = (select: boolean): Array<ListItem> => {
            let highlightedItems: Array<ListItem> = [];
            this.itemList.forEach(function (value, index, arr) {
                if (value.element.classList.contains("active") && value.selected === select) {
                    highlightedItems.push(value);
                }
            });
            return highlightedItems;
        }
        UpdateItems = (queuedItems: Array<ListItem>, select: boolean) => {
            queuedItems.forEach((value, index, arr) => {
                value.element.remove();
                if (select) {
                    this.selectedList.appendChild(value.element);
                } else {
                    this.unselectedList.appendChild(value.element);
                }
            });
        }
        BuildSelector = () => {
            let container: HTMLElement = document.getElementById(this.id);
            let leftCol: HTMLDivElement = document.createElement("div");
            let rightCol: HTMLDivElement = document.createElement("div");

            leftCol.classList.add("col-5");
            rightCol.classList.add("col-5");
            container.classList.add("row");
            this.selectedList.classList.add("list-group");
            this.unselectedList.classList.add("list-group");

            this.itemList.forEach( (value, index, arr) => {
                this.unselectedList.appendChild(value.element);
            });

            leftCol.appendChild(this.selectedList);
            rightCol.appendChild(this.unselectedList);
            container.appendChild(leftCol);
            container.appendChild(this.BuildToolbar());
            container.appendChild(rightCol);
        }
        BuildToolbar = (): HTMLDivElement => {
            let toolbar: HTMLDivElement = document.createElement("div");
            let buttonList: HTMLUListElement = document.createElement("ul");
            let itemsArr: Array<HTMLSpanElement> = [];
            toolbar.classList.add("col-2");
            buttonList.classList.add("list-group", "align-items-center");

            let selectBtn: HTMLSpanElement = document.createElement("span");
            selectBtn.classList.add(this.classList.selectBtn, "fa");
            itemsArr.push(selectBtn);
            selectBtn.addEventListener("click", () => {
                this.SelectItems();
            });

            let unselectBtn: HTMLSpanElement = document.createElement("span");
            unselectBtn.classList.add(this.classList.unselectBtn, "fa");
            itemsArr.push(unselectBtn);
            unselectBtn.addEventListener("click", () => {
                this.UnselectItems();
            });

            itemsArr.forEach((value, index, arr) => {
                let item: HTMLLIElement = document.createElement("li");
                item.classList.add("list-group-item");
                item.appendChild(value);
                buttonList.appendChild(item);
            });           

            toolbar.appendChild(buttonList);
            return toolbar;
        }
    }

    class ListItem {
        element: HTMLLIElement;
        selected: boolean;
        category?: string;
        constructor(name: string, category: string) {
            this.element = document.createElement("li");
            this.element.innerText = name;
            this.element.classList.add("list-group-item");
            this.element.addEventListener("click", () => {
                this.element.classList.toggle("active");
            });
            this.selected = false;
        }
    }
    interface InitObject {
        data: Array<UserItem>;
        id: string;
        search?: boolean;
        classList?: ClassObject;
    }
    interface UserItem {
        name: string;
        category?: string;
    }
    interface ClassObject {
        ul: string;
        li: string;
        selectBtn: string;
        unselectBtn: string;
        clicked: string;
    }

    let data: Array<UserItem> = [
        {
            name: "one",
        },
        {
            name: "two",
        },
        {
            name: "three"
        }
    ]
    let options: InitObject = {
        data: data,
        id: "list",
    }
    let selector = new DualSelect(options);
}

