function idcheck() {
    var exp = /^(?=.*[a-z])(?=.*\d)[a-z\d]{6,10}$/;
    var id = document.getElementById('id').value;
    var result = document.getElementById('idCheckResult');
    if(id.length==0){
        result.style.color = 'red';
        result.innerHTML = '필수입력입니다.';
    } else if(id.match(exp)) {
        result.style.color = 'green';
        result.innerHTML = '사용 가능한 아이디 입니다.';
    } else {
        result.style.color = 'red';
        result.innerHTML = '아이디는 6~10자리, 소문자, 숫자 포함입니다.';
    }
}

function pwdcheck() {
    var exp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-])[a-zA-Z\d!@#$%^&*()-]{8,16}$/;
    var pwd = document.getElementById('pwd').value;
    var result = document.getElementById('pwdCheckResult');
    if(pwd.length==0){
        result.style.color = 'red';
        result.innerHTML = '필수입력입니다.';
    } else if(pwd.match(exp)) {
        result.style.color = 'green';
        result.innerHTML = '사용 가능한 비밀번호 입니다.';
    } else {
        result.style.color = 'red';
        result.innerHTML = '비밀번호는 8~16자리, 대소문자, 특수문자, 숫자 포함입니다.';
    }
}

function pwdconfirm() {
    var pwd = document.getElementById('pwd').value;
    var pwdconfirm = document.getElementById('pwdConfirm').value;
    var result = document.getElementById('pwdConfirmResult');
    if(pwd==pwdconfirm){
        result.style.color = 'green';
        result.innerHTML = '일치합니다';
    } else {
        result.style.color = 'red';
        result.innerHTML = "일치하지 않습니다";
    }
}

function namecheck() {
    var name = document.getElementById('name').value;
    var result = document.getElementById('nameCheckResult');
    if(name.length==0){
        result.style.color = 'red';
        result.innerHTML = '필수입력입니다.';
    } else {
        result.innerHTML = '';
    }
}

function domainselect(value) {
    document.getElementById('domain').value = value;
}

function phonecheck() {
    // 세자리숫자-네자리숫자-네자리숫자
    var exp = /^\d{3}-\d{4}-\d{4}$/;
    var phone = document.getElementById('phone').value;
    var result = document.getElementById('phoneCheckResult');
    if(phone.match(exp)){
        result.style.color = 'green';
        result.innerHTML = '유효한형식';
    } else {
        result.style.color = 'red';
        result.innerHTML = '유효하지 않은 전화번호 형식';
    }        
}

//본 예제에서는 도로명 주소 표기 방식에 대한 법령에 따라, 내려오는 데이터를 조합하여 올바른 주소를 구성하는 방법을 설명합니다.
function sample4_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var roadAddr = data.roadAddress; // 도로명 주소 변수
            var extraRoadAddr = ''; // 참고 항목 변수

            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraRoadAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '' && data.apartment === 'Y'){
            extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if(extraRoadAddr !== ''){
                extraRoadAddr = ' (' + extraRoadAddr + ')';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('sample4_postcode').value = data.zonecode;
            document.getElementById("sample4_roadAddress").value = roadAddr;
            document.getElementById("sample4_jibunAddress").value = data.jibunAddress;
            
            // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
            if(roadAddr !== ''){
                document.getElementById("sample4_extraAddress").value = extraRoadAddr;
            } else {
                document.getElementById("sample4_extraAddress").value = '';
            }

            var guideTextBox = document.getElementById("guide");
            // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
            if(data.autoRoadAddress) {
                var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
                guideTextBox.style.display = 'block';

            } else if(data.autoJibunAddress) {
                var expJibunAddr = data.autoJibunAddress;
                guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
                guideTextBox.style.display = 'block';
            } else {
                guideTextBox.innerHTML = '';
                guideTextBox.style.display = 'none';
            }
        }
    }).open();
}