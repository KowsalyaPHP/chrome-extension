chrome.runtime.onMessage.addListener(function (request, sender) {
    if (request.action == "getSource") {
        message.innerText = request.source;
        var el = document.createElement('html');
        el.innerHTML = request.source;

        var usernameEle = el.getElementsByClassName('userName');
        if (usernameEle && usernameEle.length > 0) {
            var names = usernameEle[0].innerText.trim().split(" ");
            if (names && names[0]) {
                firstname.value = names[0];
                pdfname.innerText = names[0];
            }
            if (names && names.length > 1) {
                lastname.value = names[names.length - 1];
                pdfname.innerText = pdfname.innerText + " " + names[names.length - 1];
            }
        }

        var emailEle = el.getElementsByClassName('email');
        if (emailEle && emailEle.length > 0) {
            email.value = emailEle[0].innerText.trim();
            pdfemail.innerText = emailEle[0].innerText.trim();
        }

        var contactNoEle = el.getElementsByClassName('phoneNo');
        if (contactNoEle && contactNoEle.length > 0) {
            var mno = contactNoEle[0].innerText.trim().replace("Contact:", "");
            if (mno.length > 10) {
                mno = mno.substring(mno.length - 10, mno.length);
            }
            contactno.value = mno;
            pdfmobileno.innerText = mno;
        }

        var expInfoEle = el.getElementsByClassName('expInfo');
        if (expInfoEle && expInfoEle.length > 0) {
            var expInfo = expInfoEle[0].innerText.trim().split(" ");
            if (expInfo && expInfo.length > 0) {
                totexp.value = expInfo[0].replace("yr", "");
                pdfexp.innerText = expInfo[0].replace("yr", "") + "years experience";
            }
        }

        var locationEle = el.getElementsByClassName('locInfo');
        if (locationEle && locationEle.length) {
            curlocation.value = locationEle[0].innerText.trim();
        }

        var cvDetEle = el.getElementsByClassName('cv-details');
        if (cvDetEle && cvDetEle.length > 0) {
            var cvDetEle1 = document.createElement('div');
            cvDetEle1.innerHTML = cvDetEle[0].innerHTML;
            var cvDescEle = cvDetEle1.getElementsByClassName("desc");
            if (cvDescEle && cvDescEle.length > 0) {
                if (cvDescEle[1]) {
                    dob.value = cvDescEle[1].innerText.trim();
                    pdfdob.innerText = cvDescEle[1].innerText.trim();
                }
                if (cvDescEle[2]) {
                    gender.value = cvDescEle[2].innerText.trim();
                    pdfgender.innerText = cvDescEle[2].innerText.trim();
                }
                if (cvDescEle[3]) {
                    pdfmaritalstatus.innerText = cvDescEle[3].innerText.trim();
                    maritalstatus.value = cvDescEle[3].innerText.trim();
                }
                if (cvDescEle[4]) {
                    //address.value = cvDescEle[4].innerText.trim();
                    if (cvDescEle[4].innerText.trim().length > 0) {
                        var addr = cvDescEle[4].innerText.trim().split(",");
                        if (addr.length > 0) {
                            if (addr[0]) {
                                address1.value = addr[0];
                            }
                            if (addr[1]) {
                                address2.value = addr[1];
                            }
                            if (addr[2]) {
                                address3.value = addr[2];
                            }
                            if (addr[3]) {
                                address4.value = addr[3];
                            }
                            if (addr.length > 4) {
                                for (var i = 4; i < addr.length; i++) {
                                    address4.value = address4.value + "," + addr[i];
                                }
                            }
                        }
                    }
                    pdfaddress.innerText = cvDescEle[4].innerText.trim();
                }
            }
        }

        var roleEle = el.getElementsByClassName("innerDetailsCont");
        if (roleEle && roleEle.length > 0) {
            var roleEle1 = document.createElement('div');
            roleEle1.innerHTML = roleEle[0].innerHTML;
            var roleEl = roleEle1.getElementsByClassName("cDesig");
            if (roleEl && roleEl.length > 0) {
                pdfrole.innerText = roleEl[0].innerText;
                role.value = roleEl[0].innerText;
            }
        }

        var educationEle = el.getElementsByClassName("education-inner");
        var eduDet = "<table class='w-100 table'><tr><th>Degree</th><th>Institution</th><th>Year</th></tr>";
        var pdfEduDet = "<table style='width:100%; font-size: 12px;'><tr><th>Degree</th><th>Institution</th><th>Year</th></tr>";
        var educationDetails = [];
        if (educationEle && educationEle.length > 0) {
            for (var i = 0; i < educationEle.length; i++) {
                var degree = "";
                var institution = "";
                var year = "";
                eduDet = eduDet + "<tr>";
                var educationEle1 = document.createElement('div');
                educationEle1.innerHTML = educationEle[i].innerHTML;
                var degEle = educationEle1.getElementsByClassName("deg");
                if (degEle && degEle.length > 0) {
                    degree = degEle[0].innerText.trim();
                    eduDet = eduDet + "<td>" + degree + "</td>";
                }
                var orgEle = educationEle1.getElementsByClassName("org");
                if (orgEle && orgEle.length > 0) {
                    institution = orgEle[0].innerText.trim();
                    eduDet = eduDet + "<td>" + institution + "</td>";
                }
                var detEle = educationEle1.getElementsByClassName("detail");
                if (detEle && detEle.length > 0) {
                    if (degree != "") {
                        year = detEle[0].innerText.trim().replace(degree, "");
                        eduDet = eduDet + "<td>" + year + "</td>";
                    }
                    else {
                        year = detEle[0].innerText.trim();
                        eduDet = eduDet + "<td>" + year + "</td>";
                    }
                }
                eduDet = eduDet + "</tr>";
                var eduObj = {
                    Degree_Awarded: degree,
                    Institution: institution,
                    Passing_Year: year,
                    Marks_Obtained: ""
                };
                educationDetails.push(eduObj);
            }
            eduDet = eduDet + "</table>";
            pdfEduDet = eduDet.replace("<table class='w-100 table'><tr><th>Role</th><th>Company</th><th>Duration</th></tr>", pdfExpDet);
            educationcontent.innerHTML = eduDet;
            pdfeducationcontent.innerHTML = pdfEduDet;
            edujson.innerText = JSON.stringify(educationDetails);
        }
        var expEle = el.getElementsByClassName("exp-container");
        var expDet = "<table class='w-100 table'><tr><th>Role</th><th>Company</th><th>Duration</th></tr>";
        var pdfExpDet = "<table style='width: 100%; font-size: 12px;' class='w-100 table'><tr><th>Role</th><th>Company</th><th>Duration</th></tr>";
        var expDetails = [];
        if (expEle && expEle.length > 0) {
            for (var i = 0; i < expEle.length; i++) {
                var designation = "";
                var company = "";
                var expyear = "";
                expDet = expDet + "<tr>";
                var expEle1 = document.createElement('div');
                expEle1.innerHTML = expEle[i].innerHTML;
                var desEle = expEle1.getElementsByClassName("designation");
                if (desEle && desEle.length > 0) {
                    designation = desEle[0].innerText.trim();
                    expDet = expDet + "<td>" + designation + "</td>";
                }
                var orgEle = expEle1.getElementsByClassName("org");
                if (orgEle && orgEle.length > 0) {
                    company = orgEle[0].innerText.trim();
                    expDet = expDet + "<td>" + company + "</td>";
                }
                var yrEle = expEle1.getElementsByClassName("time");
                if (yrEle && yrEle.length > 0) {
                    if (designation != "") {
                        expyear = yrEle[0].innerText.trim().replace(designation, "");
                        expDet = expDet + "<td>" + expyear + "</td>";
                    }
                    else {
                        expyear = yrEle[0].innerText.trim();
                        expDet = expDet + "<td>" + expyear + "</td>";
                    }
                }
                expDet = expDet + "</tr>";
                var expY = expyear.split(" ");
                var fromDate = "";
                var tillDate = "";
                if (expY && expY.length == 5) {
                    fromDate = expY[0] + " " + expY[1];
                    tillDate = expY[3] + " " + expY[4];
                }
                else if (expY && expY.length == 6) {
                    fromDate = expY[1] + " " + expY[2];
                    tillDate = expY[4] + " " + expY[5];
                }
                var expObj = {
                    role: designation,
                    Employer: company,
                    From_Date: fromDate,
                    Until_Date: tillDate
                };
                expDetails.push(expObj);
            }
            expDet = expDet + "</table>";
            pdfExpDet = expDet.replace("<table class='w-100 table'><tr><th>Role</th><th>Company</th><th>Duration</th></tr>", pdfExpDet);
            expcontent.innerHTML = expDet;
            pdfexpcontent.innerHTML = pdfExpDet;
            expjson.innerText = JSON.stringify(expDetails);
        }
        var skillEle = el.getElementsByClassName("itSkill");
        if (skillEle && skillEle.length > 0) {
            pdfskill.innerText = skillEle[0].innerText;
            skill.value = skillEle[0].innerText;
        }
    }
});

var uniqueSessionId = "";
var userName = "";
var clientList = "";
var refId = "";
var apiBaseUrl = "http://devapi.emaginerock.com/";
// var apiBaseUrl = "http://localhost:8888/";

function getAllWindow(tabs) {
    for (var i = 0; i < tabs.length; i++) {
        var tab = tabs[i];
        if (tab.url && tab.url.indexOf("emaginerock.com") > -1) {
            // Get unique session id
            chrome.tabs.executeScript(tab.id, {
                code: 'var x = sessionStorage.getItem("uniqueSessionId"); x'
            }, uniqueSessionIdVal);

            // Get username
            chrome.tabs.executeScript(tab.id, {
                code: 'var x = sessionStorage.getItem("userName"); x'
            }, userNameVal);

            // Get client list
            chrome.tabs.executeScript(tab.id, {
                code: 'var x = sessionStorage.getItem("ClientList"); x'
            }, clientListVal);

            // Get reference id
            chrome.tabs.executeScript(tab.id, {
                code: 'var x = sessionStorage.getItem("RefId"); x'
            }, refIdVal);
            break;
        }
    }
}

function uniqueSessionIdVal(value) {
    if (value && value.length > 0) {
        uniqueSessionId = value[0];
    }
}

function userNameVal(value) {
    if (value && value.length > 0) {
        userName = value[0];
    }
}

function clientListVal(value) {
    if (value && value.length > 0) {
        ClientList = value[0];
    }
}

function refIdVal(value) {
    if (value && value.length > 0) {
        refId = value[0];
    }
}

function onWindowLoad() {
    //checking session
    chrome.tabs.getAllInWindow(getAllWindow);

    //element declaration
    var message = document.querySelector('#message');
    var firstname = document.querySelector('#firstname');
    var lastname = document.querySelector('#lastname');
    var email = document.querySelector('#email');
    var contactno = document.querySelector('#contactno');
    var totexp = document.querySelector('#totexp');
    var curlocation = document.querySelector('#curlocation');
    var address1 = document.querySelector('#address1');
    var address2 = document.querySelector('#address2');
    var address3 = document.querySelector('#address3');
    var address4 = document.querySelector('#address4');
    var educationcontent = document.querySelector('#educationcontent');
    var expcontent = document.querySelector('#expcontent');
    var gender = document.querySelector('#gender');
    var dob = document.querySelector('#dob');
    var maritalstatus = document.querySelector('#maritalstatus');
    var skill = document.querySelector('#skill');
    var pdfname = document.querySelector('#pdfname');
    var pdfexp = document.querySelector('#pdfexp');
    var pdfemail = document.querySelector('#pdfemail');
    var pdfmobileno = document.querySelector('#pdfmobileno');
    var pdfeducationcontent = document.querySelector('#pdfeducationcontent');
    var pdfexpcontent = document.querySelector('#pdfexpcontent');
    var pdfrole = document.querySelector('#pdfrole');
    var pdfskill = document.querySelector('#pdfskill');
    var pdfaddress = document.querySelector('#pdfaddress');
    var pdfgender = document.querySelector('#pdfgender');
    var pdfdob = document.querySelector('#pdfdob');
    var pdfmaritalstatus = document.querySelector('#pdfmaritalstatus');
    var expjson = document.querySelector('#expjson');
    var edujson = document.querySelector('#edujson');
    var htmlele = "";

    // Get current tab html
    chrome.tabs.executeScript(null, {
        file: "getPagesSource.js"
    }, function () {
        if (chrome.runtime.lastError) {
            alert('There was an error injecting script : \n' + chrome.runtime.lastError.message);
        }
    });

    $(document).ready(function () {
        $(".loader").fadeOut();
    });
    $("#candidatedetails").hide();

    setTimeout(function () {
        if (userName) {
            $("#login").hide();
            $("#candidatedetails").show();
            $("#logoutdiv").show();
            $("#loggedname").html(userName);
            getReqId();
        }
        else {
            $("#login").show();
            $("#candidatedetails").hide();
        }
    }, 1000);

    $("#loginform").submit(function (event) {
        event.preventDefault();
        var username = $("#username").val();
        var password = $("#password").val();
        if (username && password) {
            $(".loader").fadeIn("slow");
            $.ajax({
                type: "POST",
                url: apiBaseUrl + "signin",
                data: {
                    userID: username,
                    password: password
                },
                dataType: "json",
                success: function (result, status, xhr) {
                    if (result["Message"].indexOf("200:") > -1) {
                        var userDet = result["Data"]["Userdetail"];
                        if (userDet != null) {
                            userDet = userDet[0];
                            userName = userDet["USERNAME"];
                            clientList = userDet["ClientList"];
                            refId = userDet["REFID"];
                            uniqueSessionId = userDet["USERID"];
                            $("#logoutdiv").show();
                            $("#loggedname").html(userName);
                            $("#login").hide();
                            $("#candidatedetails").show();
                            getReqId();
                        }
                    }
                    else {
                        alert(result["Message"].replace("400:", ""));
                    }

                    $(".loader").fadeOut();
                },
                error: function (xhr, status, error) {
                    $(".loader").fadeOut();
                    alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
                }
            });
        }
    });

    $(".logout-link").click(function () {
        $("#loggedname").html("");
        $("#logoutdiv").hide();
        userName = "";
        uniqueSessionId = "";
        clientList = "";
        refId = "";
        $("#login").show();
        $("#candidatedetails").hide();
    });

    $("#candidateform").submit(function (event) {
        event.preventDefault();
        var fd = new FormData();
        fd.append('EntityID', refId);
        fd.append('RequisitionId', $("#reqid").val());
        fd.append('UserId', uniqueSessionId);
        fd.append('Candidate_FN', $("#firstname").val());
        fd.append('Candidate_LN', $("#lastname").val());
        fd.append('EMailId', $("#email").val());
        fd.append('TotalExpYear', $("#totexp").val());
        fd.append('Role', $("#role").val());
        fd.append('MobileNo', $("#contactno").val());
        fd.append('DateofBirth', $("#dob").val());
        fd.append('Gender', $("#gender").val());
        fd.append('MaritalStatus', $("#maritalstatus").val());
        fd.append('Skills', $("#skill").val());
        fd.append('WorkAuthorization', "");
        fd.append('PassportNo', "");
        fd.append('Nationality', "");
        fd.append('Pr_AddressL1', $("#address1").val());
        fd.append('Pr_AddressL2', $("#address2").val());
        fd.append('Pr_AddressL3', $("#address3").val());
        fd.append('Pr_AddressL4', $("#address4").val());
        fd.append('Perm_AddressL1', $("#address1").val());
        fd.append('Perm_AddressL2', $("#address2").val());
        fd.append('Perm_AddressL3', $("#address3").val());
        fd.append('Perm_AddressL4', $("#address4").val());
        fd.append('C_ID', uniqueSessionId);
        var educationDetails;
        if (edujson.innerText) {
            educationDetails = edujson.innerText;
        }
        else {
            var eduObj = {
                Degree_Awarded: "",
                Institution: "",
                Passing_Year: "",
                Marks_Obtained: ""
            };
            educationDetails = JSON.stringify(eduObj);
        }
        var expDetails;
        if (expjson.innerText) {
            expDetails = expjson.innerText;
        }
        else {
            var expObj = {
                role: "",
                Employer: "",
                From_Date: "",
                Until_Date: ""
            };
            expDetails = JSON.stringify(expObj);
        }
        fd.append('EduDetails', educationDetails);
        fd.append('EmpDetails', expDetails);
        fd.append('sourcecategory', 'Selfsource');
        if(!$("#reqid").val() || !$("#firstname").val() || !$("#email").val() || !$("#contactno").val()){
            alert("Enter required details!");
            return;
        }
        $(".loader").fadeIn('slow');
        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: apiBaseUrl + "CVDetSubmit",
            data: fd,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 80000,
            success: function (result, status, xhr) {
                if (result["Message"].indexOf("200:") > -1) {
                    $("#candidatedetails").hide();
                    $("#successcontent").show();
                }
                else {
                    alert(result["Message"].replace("400:", ""));
                }
                $(".loader").fadeOut();
            },
            error: function (xhr, status, error) {
                alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
                $(".loader").fadeOut();
            }
        });
    });
}

function getReqId() {
    $.ajax({
        type: "POST",
        url: apiBaseUrl + "reqdashboard",
        data: {
            ReqStatus: "OP",
            EntityId: refId,
            clientid: clientList
        },
        dataType: "json",
        success: function (result, status, xhr) {
            if (result["Message"].indexOf("200:") > -1) {
                var redIdSelect = $("#reqid");
                var openReq = [];
                if (result && result["Data"] && result["Data"]["RequisitionDetail"]) {
                    openReq = result["Data"]["RequisitionDetail"];
                    if (openReq && openReq.length > 0) {
                        openReq.forEach(element => {
                            redIdSelect.append('<option value="' + element["RequistionId"] + '">' + element["RequistionId"] + ' - ' + element['ReqTitle'] + '</option>');
                        });
                    }
                }
                $("#reqid").select2();
            }
            else {
                alert(result["Message"].replace("400:", ""));
            }
        },
        error: function (xhr, status, error) {
            alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
        }
    });
}


window.onload = onWindowLoad;