# Project - *SkyArena*

**SkyArena** là repository cho đồ án nhóm. Nhóm tối đa 4 thành viên.

Thành viên:
* [x] **1312415** - Trần Thanh Phán - 1312415 - idkwayta@gmail.com - 1312415@github.com - Tỉ lệ đóng góp cho đề tài
* [x] **1312340** - Lê Quốc Tấn Lộc - 1312340 - email - Tỉ lệ đóng góp cho đề tài
* [x] **1312393** - Phùng Hải Nguyên - 1312393 - email - Tỉ lệ đóng góp cho đề tài

URL: **URL hosting của đề tài**
Báo cáo: **URL Github Page của đề tài**

## Yêu cầu

Trong đề tài, sinh viên cần mô tả các chức năng có thể thực hiện bên dưới. Sinh viên check vào các mục bên dưới và ghi mã sinh viên đã làm vào chức năng theo mẫu. Mục nào ko có MSSV là tính điểm theo nhóm. Cần sắp xếp các chức năng bên dưới theo thứ tự MSSV đã thực hiện.

Làm việc nhóm:
* [x] Có sử dụng GIT.
* [x] Sử dụng GIT theo Centralized Workflow.
* [x] Sử dụng GIT theo Feature Branch Workflow.
* [ ] Sử dụng GIT theo Gitflow Workflow.

## Mô tả nghiệp vụ chung ứng dụng
Trang web bán hàng với chức năng merchant! Cho phép người dùng đăng kí làm thành viên , Nếu người dùng muốn dùng chức năng của 1 merchant ( mở cửa hàng cá nhân) thì phải nạp Premium. Người dùng thường chỉ có thể mua hàng thông qua cửa hàng mà không được bán. Merchant có thể quản  lí shop của mình như thêm items, đổi nhạc nền của shop, quản lí thu nhập, xem số tiền đã bán được của shop và rút tiền trong shop về tài khoản của mình.

## Lập trình server
### MVC
* [x] MVC (1312415)
* [x] Config (1312415)
* [x] REST routing (1312415)
* [x] Layout & partial (1312415)

### Lập trình dữ liệu
* [x] Thêm (1312415)
* [x] Xóa (1312415)
* [x] Sửa (1312415)
* [x] Tìm kiếm (1312415)

### Xử lý lỗi
* [x] Xử lý lỗi trong cùng trang web (1312415)
* [x] Xử lý lỗi dùng trang web riêng (1312415)
   * [x] 401 (1312415)
   * [x] 404 (1312415)
   * [x] 500 (1312415)

### Tương tác API khác
Liệt kê các API nhóm đã sử dụng được ở đây
* [x] Facebook API: Login (1312415)
* [x] Google API: Login (1312415)
* [x] geoip-db API: get user longitude and latitude(1312415)
* [x] darksky: get current weather with longitude and latitude(1312415)
* [x] paypal: to checkout (1312415)
* [x] cloudinary: to upload images and video to cloud(1312415)

## Lập trình client
* [x] Kiểm tra dữ liệu (1312415)
* [x] Animation (1312415)
* [x] Thao tác DOM (1312415)
* [x] AJAX (1312415)

## Bảo mật
* [x] Chứng thực (1312415)
* [x] Phân quyền sử dụng một số trang web với nhiều vai trò khác nhau (1312415)
   * [x] Không cho phép thao tác vào trang web khi không có quyền (MSSV1)
   * [x] Thể hiện các chức năng khác nhau trên cùng giao diện khi người dùng có quyền khác nhau (MSSV1)
   * [x] Thể hiện lỗi khi không truy xuất được trang khi không có quyền (MSSV1)

## Nâng cao
* [x] Sử dụng kiến trúc redux cho react(1312415)
* [x] Sử dụng cơ sở dữ liệu Redis để lưu session(1312415)
* [x] Sử dụng webpack để biên dịch cho react(1312415)
* [x] Sử dụng socket.io để xử lý chat thời gian thực(1312415)
* [x] Lưu tất cả các biến hằng quan trọng bằng biến enviroment(1312415)

## Chức năng đã thực hiện
Các **yêu cầu chức năng** (check và ghi MSSV vào các phần chức năng đã thực hiện)
* [x] Khi người dùng đăng nhập vào sẽ được vào các trang như friend,chat,video(1312415)
* [x] khi người dùng đăng nhập thì trang web sẽ dùng API để lấy kinh độ và vĩ độ của người đó và dùng API để lấy thời tiết và nhiệt độ trả về giao diện (1312415)
* [x] Thực hiện chức năng đăng nhập/đăng ký bằng email bình thường và kiểm tra kỹ các thông số tài khoản dăng nhập và cho phép người dùng nhập ảnh đại diện (1312415)
* [x] Thực hiện đăng nhập bằng facebook và google account lấy các thông số và ảnh đại diện của tài khoản đó(1312415)
* [x] Thực hiện việc lưu session trong cơ sở dữ liệu của Redis để thuận tiện việc  phát triển ứng dụng(1312415)
* [x] Thực hiện hash salt mật khẩu để đảm bảo việc bảo mật (1312415)
* [x] Thực hiện việc cập nhật tài khoản đăng nhập bằng email, không cho cập nhật tài khoản đăng nhập bằng google hay facebook (1312415)
* [x] Cho phép người dùng cập nhật tài khoản thành premium thêm 30 ngày người dùng premium sẽ được cập nhật vào và sử dụng dịch vụ upload và xem video (1312415)
* [x] Việc cập nhật tài khoản thành premium sẽ tốn phí và trả qua dịch vụ Paypal ở chế đô sandbox (idkwayta2-buyer@gmail.com/19823764500)(1312415)
* [x] Người dùng có thể search các người dùng khác để kết bạn  theo tên giao diện và API được thiết kế để giúp phân trang kết quả tìm được(1312415)
* [x] Khi kết bạn với người dùng khác sẽ đưa ra yêu cầu kết bạn và người dùng kia sẽ chấp nhận yêu cầu kết bạn(1312415)
* [x] Khi 2 người dùng đã kết bạn thì sẽ cho phép 2 người dùng chat trực tuyến(1312415)
* [x] Khi 1 người vào trang chat sẽ hiển thị người đó online cho tất cả người dùng là bạn người đó (1312415)
* [x] Khi 1 người dùng nhận được message trong chat mà người đó không online hay không theo dõi thì hệ thống sẽ thông báo cho người dùng đó qua giao diện (1312415)
* [x] Trang Video sẽ không cho người dùng vào nếu như người dùng không phải là người dùng premium và cũng không cho tiếp cận API (1312415)
* [x] Trang Video sẽ cho phép người dùng search theo tên  video và xuất ra 12 video, khi dến cuối trang sẽ cho người dùng load thêm 12 video nếu nhu còn (1312415)
* [x] Trong Video nếu như vào mục Your video sẽ cho phép upload video (1312415)
* [x] Nếu như upload video xảy ra lỗi thì sẽ xuất popup lỗi, nếu thành công sẽ xuất popup thành công  (1312415)
* [x] Khi vào 1 video người dùng sẽ được phép like và dislike(1312415)
* [x] Cho phép người dùng xuất comment(1312415)
* [x] Tương tự khi dến cuối trang của video đó sẽ cho phép load thêm comment nếu còn(1312415)


## Demo
Link ảnh GIF demo ứng dụng:
### Demo 1 (authentication, update, premium)
![Video Walkthrough](demo.gif)

Tạo ảnh GIF với chương trình [LiceCap](http://www.cockos.com/licecap/).


## License

    Copyright [yyyy] [name of copyright owner]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
