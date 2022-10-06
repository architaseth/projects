var UnList = document.getElementById('ListOfUserExpense');
        var dltBtn = document.getElementsByClassName("del");
        var edt = document.getElementsByClassName("ed");
        document.addEventListener('click', removeItem);


        function saveData(event) {
            event.preventDefault();


            var obj = {};
            obj.amount = event.target.amount.value;
            obj.description = event.target.description.value;
            obj.category = event.target.category.value;

            let unique_Id_array = Object.keys(localStorage);

            checkduplicacy(obj, unique_Id_array);

        };

        function checkduplicacy(temp, keyy) {
            //edge case 
            if (keyy.some((v) => { return v === temp.category })) {
                alert(`Expense Category ${temp.category} is  already in the list`);
            }
            else {

                localStorage.setItem(temp.category, JSON.stringify(temp));


                showDetailsOnScreen(temp);
            }
        };

        window.addEventListener("DOMContentLoaded", () => {
            const localStorageObj = localStorage;
            const localstoragekeys = Object.keys(localStorageObj)

            for (var i = 0; i < localstoragekeys.length; i++) {
                const key = localstoragekeys[i]
                const userDetailsString = localStorageObj[key];
                const userDetailsObj = JSON.parse(userDetailsString);
                showDetailsOnScreen(userDetailsObj);
            }
        });

        function showDetailsOnScreen(user) {
            var parentNode = document.getElementById("ListOfUserExpense");
            //console.log(parentNode);
            var Child_printDetails = `<li id="${user.category}">Choose Expense Amount::- ${user.amount} &nbsp;&nbsp; Choose Description:- ${user.description} &nbsp;&nbsp; Choose a Category:- ${user.category}&nbsp;<button class="ed">Edit</button>&nbsp;<button class="del">Delete</button></li>`;
            parentNode.innerHTML = parentNode.innerHTML + Child_printDetails;

        };

        function removeItem(event) {
            if (event.target.classList.contains('del')) {
                if (confirm('delete')) {
                    var list_ = event.target.parentElement;
                    var list_id = event.target.parentElement.id;
                    UnList.removeChild(list_);

                    let unique_Id_array1 = Object.keys(localStorage);
                    if (unique_Id_array1.some((v) => { return v === list_id })) {
                        for (var i = 0; i < unique_Id_array1.length; i++) {
                            if (unique_Id_array1[i] === list_id)
                                localStorage.removeItem(unique_Id_array1[i]);

                        }

                    }
                }

            }

            else if (event.target.classList.contains('ed')) {
                var list_ = event.target.parentElement;
                var list_id = event.target.parentElement.id;
                UnList.removeChild(list_);

                let unique_Id_array1 = Object.keys(localStorage);
                if (unique_Id_array1.some((v) => { return v === list_id })) {
                    for (var i = 0; i < unique_Id_array1.length; i++) {
                        if (unique_Id_array1[i] === list_id)
                            localStorage.removeItem(unique_Id_array1[i]);

                    }

                }
                document.getElementById("amount").focus();
            }
        };

