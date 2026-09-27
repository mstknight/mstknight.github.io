// 修改此文件即可更新网站个人资料、书架和审美作品。
export const profile = {
  name: 'elio',
  email: 'xinyangli1204@126.com',
  github: 'https://github.com/mstknight',
  intro: '你好，我是李昕炀，一名算法工程师。',
  about: '我专注于算法研发、计算机视觉与自动化工程，喜欢把数据、模型和可靠的工程流程连接起来。现在我在香港大学攻读创新设计与技术 MSc(Eng) 学位。',
  education: [
    { school: '香港大学', short: 'HKU', degree: 'MSc(Eng) in Innovative Design and Technology', period: '2026.09 - 至今', tone: 'burgundy' },
    { school: '北京建筑大学', short: 'BUCEA', degree: '自动化 · 本科', period: '2022.09 - 2026.06', tone: 'blue' }
  ],
  experience: [
    { company: '蓝点触控（北京）科技有限公司', role: '算法工程实习生', period: '2024.07 - 2024.08', detail: '参与智能机器人力控算法研发与调优，完成传感器数据处理模型与信号分析测试。' },
    { company: '北京极光星通科技有限公司', role: '算法工程实习生', period: '2025.07 - 2025.09', detail: '参与星间与星地激光通信链路建模与调优，使用 MATLAB 开展关键参数研究。' },
    { company: '成都创锐机电设备有限公司', role: '自动化工程实习生', period: '2025.01 - 2025.02', detail: '分析 PLC 电路图与控制逻辑，参与设备运行数据采集、诊断与效率评估。' }
  ],
  books: [
    { title: '三体', author: '刘慈欣', note: '宇宙尺度的想象力', tone: 'red', mark: '3' },
    { title: '地狱', author: '丹·布朗', note: '艺术、密码与追逐', tone: 'gold', mark: 'D' },
    { title: '魔法的语言', author: '克劳迪娅·汉默', note: '文字如何改变现实', tone: 'violet', mark: 'A' },
    { title: '阴兽', author: '江户川乱步', note: '暗处的审美与推理', tone: 'ink', mark: '陰' },
    { title: '马斯克原理', author: '商业与工程思维', note: '把不可能拆成问题', tone: 'silver', mark: 'X' },
    { title: '动手学深度学习', author: '李沐 等', note: '从公式到可运行的模型', tone: 'green', mark: 'D2L' }
  ],
  aestheticWorks: [
    { title: '夜航', kind: 'PHOTO / 01', description: '城市灯光在玻璃上的短暂反射', tone: 'night' },
    { title: '结构与留白', kind: 'FORM / 02', description: '喜欢把秩序留给观看者完成', tone: 'paper' },
    { title: '慢速生长', kind: 'NOTE / 03', description: '记录一些还没有答案的想法', tone: 'moss' }
  ],
  projects: [
    { title: '无人机飞控传感器故障诊断技术研究', type: '本科毕业设计 · 2025.09 - 2026.06', description: '围绕 IMU、VFR HUD、RC 输出与电池电芯数据完成多源数据时间对齐、插值和标准化；构建 19 维时序特征与 128 点滑动窗口数据集，并以 CNN-BiLSTM-Attention 完成故障分类。', tags: ['Python', 'PyTorch', 'CNN-BiLSTM-Attention'] },
    { title: '多场景水果检测与分类', type: '负责人 · 2025.05 - 2025.09', description: '使用数据增强与迁移学习提升复杂环境下的目标检测与分类能力，达到 mAP 96.5%、39.26 FPS，并完成结果可视化界面。', tags: ['YOLOv5', '迁移学习', 'Computer Vision'] }
  ],
  skills: ['Python', 'PyTorch', 'Scikit-learn', 'CNN / BiLSTM / Attention', 'YOLOv5 / CBAM / NMS', 'Pandas / NumPy', 'MATLAB', 'PyQt5', 'Keil / C / Dev-C++']
}
