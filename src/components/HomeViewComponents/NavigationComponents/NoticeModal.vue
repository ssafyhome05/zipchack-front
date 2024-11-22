<template>
    <div class="modal fade" id="notice-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-4 fw-bold" id="exampleModalLabel">공지사항</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="notice-body">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col">변호</th>
                            <th scope="col" class="title">제목</th>
                            <th scope="col">등록일</th>
                            <th scope="col">수정일</th>
                            </tr>
                        </thead>
                        <tbody class="table-group-divider">
                            <tr>
                                <th scope="row" class="notice-num">1</th>
                                <td class="notice-title">Mark</td>
                                <td class="notice-created">Otto</td>
                                <td class="notice-modified">@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row" class="notice-num">1</th>
                                <td class="notice-title">Mark</td>
                                <td class="notice-created">Otto</td>
                                <td class="notice-modified">@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row" class="notice-num">1</th>
                                <td class="notice-title">Mark</td>
                                <td class="notice-created">Otto</td>
                                <td class="notice-modified">@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row" class="notice-num">1</th>
                                <td class="notice-title">Mark</td>
                                <td class="notice-created">Otto</td>
                                <td class="notice-modified">@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row" class="notice-num">1</th>
                                <td class="notice-title">Mark</td>
                                <td class="notice-created">Otto</td>
                                <td class="notice-modified">@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row" class="notice-num">1</th>
                                <td class="notice-title">Mark</td>
                                <td class="notice-created">Otto</td>
                                <td class="notice-modified">@mdo</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
.modal-dialog {
    max-width: 80vw;
    max-height: 80vh;
}

.modal-content {
    width: 100%;
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
}
.modal-header{
    width: 100%;
    display: flex;
    justify-content: center;
    letter-spacing: 2px;
}
.btn-close{
    position: absolute;
    right: 2%;
}
/* notice-body의 스타일링 */
.notice-body {
    position: relative;
    width: 90%;
    height: 90vh;
    background-color: white;
    /* border: 1px solid black; */
}

.title{
    width: 60%;
}

th, td {
    height: 80px;
    vertical-align: middle;
}

thead{
    text-align: center;
}

.notice-num{
    width: 8%;
    text-align: center;
}

.notice-title{
    padding-left: 5%;
}

.notice-created{
    text-align: center;
}

.notice-modified{
    text-align: center;
}
</style>
