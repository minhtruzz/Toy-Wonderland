import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-8">
        <div className="h-64 md:h-80 bg-cover bg-center" style={{backgroundImage: 'url("https://picsum.photos/id/1059/1200/600")'}}>
           <div className="w-full h-full bg-black/40 flex items-center justify-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white text-center">Về ToyWonderland</h1>
           </div>
        </div>
        <div className="p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Sứ Mệnh Của Chúng Tôi</h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Tại ToyWonderland, chúng tôi tin rằng vui chơi là cách tốt nhất để trẻ em học hỏi. 
                Sứ mệnh của chúng tôi là cung cấp những món đồ chơi an toàn, chất lượng và mang tính giáo dục cao, 
                giúp khơi dậy trí tưởng tượng và sự sáng tạo trong mỗi đứa trẻ.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 my-12">
                <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🛡️</div>
                    <h3 className="font-bold text-lg mb-2">An Toàn Tuyệt Đối</h3>
                    <p className="text-gray-500">Sản phẩm đạt chuẩn quốc tế, không chứa chất độc hại.</p>
                </div>
                 <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🧠</div>
                    <h3 className="font-bold text-lg mb-2">Phát Triển Tư Duy</h3>
                    <p className="text-gray-500">Đồ chơi được chọn lọc giúp phát triển trí tuệ và kỹ năng.</p>
                </div>
                 <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🚚</div>
                    <h3 className="font-bold text-lg mb-2">Giao Hàng Nhanh</h3>
                    <p className="text-gray-500">Đóng gói cẩn thận và giao hàng toàn quốc trong 2-3 ngày.</p>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Câu Chuyện Thương Hiệu</h2>
            <p className="text-gray-600 mb-4">
                Được thành lập vào năm 2015, ToyWonderland khởi đầu từ một cửa hàng nhỏ tại TP.HCM với niềm đam mê mang lại tiếng cười cho trẻ thơ. 
                Qua nhiều năm, chúng tôi đã phát triển thành hệ thống phân phối đồ chơi uy tín, được hàng ngàn phụ huynh tin tưởng.
            </p>
            <p className="text-gray-600">
                Chúng tôi cam kết 100% sản phẩm chính hãng từ các thương hiệu lớn như Lego, Barbie, Hot Wheels, và các thương hiệu đồ chơi gỗ Việt Nam chất lượng cao.
            </p>
        </div>
      </div>
    </div>
  );
};