module BootstrapDualSelect {
    class DualSelect {

        itemList: Array<ListItem> = new Array<ListItem>();
        id: string;
        search: boolean = true

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
        }
        SelectItems = () => {
            let queuedItems: Array<ListItem> = this.GetHighlightedItems();
            queuedItems.forEach(function (value, index, arr) {
                arr[index].selected = true;
            });
            this.UpdateItems(queuedItems);
        }
        UnselectItems = () => {
            let queuedItems: Array<ListItem> = this.GetHighlightedItems();
            queuedItems.forEach(function (value, index, arr) {
                arr[index].selected = false;
            });
            this.UpdateItems(queuedItems);
        }
        GetHighlightedItems = (): Array<ListItem> => {
            let highlightedItems: Array<ListItem> = [];
            this.itemList.forEach(function (value, index, arr) {
                if (value.element.classList.contains("active")) {
                    highlightedItems.push(value);
                }
            });
            return highlightedItems;
        }
        UpdateItems = (queuedItems: Array<ListItem>) => {

        }
        BuildSelector = () => {
            let container: HTMLElement = document.getElementById(this.id);
            let selectedList: HTMLUListElement = document.createElement("ul");
            let unselectedList: HTMLUListElement = document.createElement("ul");
            let leftCol: HTMLDivElement = document.createElement("div");
            let rightCol: HTMLDivElement = document.createElement("div");
            let middleCol: HTMLDivElement = document.createElement("div");

            middleCol.classList.add("col-2");
            leftCol.classList.add("col-5");
            rightCol.classList.add("col-5");
            container.classList.add("row");
            selectedList.classList.add("list-group");
            unselectedList.classList.add("list-group");

            this.itemList.forEach(function (value, index, arr) {
                unselectedList.appendChild(value.element);
            });

            leftCol.appendChild(unselectedList);
            rightCol.appendChild(selectedList);
            container.appendChild(leftCol);
            container.appendChild(middleCol);
            container.appendChild(rightCol);
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
    }
    interface UserItem {
        name: string;
        category?: string;
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

