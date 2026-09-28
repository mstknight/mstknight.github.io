// image 留空时显示概念示意图；收到项目截图后填写本地图片 URL。
export const featuredProjects = [
  {
    id: 'drone-aerolab', name: 'AEROLAB', subtitle: '无人机飞行实验室', category: 'SIMULATION / WEBGL', theme: 'flight',
    url: 'https://github.com/mstknight/drone-aerolab', image: '', imageAlt: 'AEROLAB 飞行实验工作区',
    summary: '把看不见的风，变成可以观察与比较的飞行实验。',
    description: '面向 X 型四旋翼定点悬停的交互式实验室。将气流、姿态、位置误差和电机输出放在同一个三维场景中，帮助理解环境扰动与控制策略之间的关系。',
    tags: ['React', 'Vite', 'Three.js', 'JavaScript'],
    features: [
      ['飞行与风场', '以 200 Hz 固定步长运行简化六自由度动力学，提供恒定风、阵风、周期变风、垂直气流、相关扰动和障碍尾流。粒子、风速矢量与速度切片共用风场采样。'],
      ['可重复对比', '在相同风场、随机种子和初始状态下，对比固定电机、姿态稳定与定点悬停三种模式，查看最大偏差、RMS 误差、倾角、饱和时长和恢复时间，并回放实验。'],
      ['模型与数据', '支持 GLB 外观模型、实验 JSON 保存与载入、CSV 导出和固定世界坐标三维速度场导入。另提供独立的固定姿态机体 CFD 基准案例。']
    ],
    flow: ['配置风场', '飞行仿真', '模式对比', '回放与导出'],
    boundary: '用于教学与可视化；参数未经实测标定。CFD 案例为固定姿态机体代理，不包含详细桨叶，不能直接用于飞控部署。',
    visualNote: '预留：飞行实验全景 / 风场与姿态对比截图'
  },
  {
    id: 'glass-folders', name: 'Glass Folders', subtitle: '让桌面多一点通透感', category: 'NATIVE / MACOS', theme: 'glass',
    url: 'https://github.com/mstknight/glass-folders', image: '', imageAlt: 'Glass Folders 图标效果和应用界面',
    summary: '保留熟悉的文件夹轮廓，重新表达光与材质。',
    description: '使用 Swift 与 AppKit 构建的原生 macOS 文件夹美化工具。读取本机文件夹轮廓，保留系统比例和留白，通过透明主体、弧面明暗与局部反光生成玻璃质感图标。',
    tags: ['Swift', 'AppKit', 'macOS', '无第三方依赖'],
    features: [
      ['材质与透明度', '提供纯净玻璃、冷调和暖调配色，以及从极透到厚重的五档透明度。切换时即时预览，应用后才写入目标文件夹图标。'],
      ['批量处理', '可为单个文件夹设置图标，也可一键处理桌面第一层可见的普通文件夹。批量结果分别列出成功、跳过与失败情况。'],
      ['备份与恢复', '首次应用时备份原图标，重复应用保留首次备份。仅修改图标元数据，不改动文件夹中的内容；退出应用后图标仍然保留。']
    ],
    flow: ['选择文件夹', '调整材质', '应用图标', '按需恢复'],
    boundary: '要求 macOS 26 或更新版本。效果是带透明通道的静态图标，不提供实时背景折射；当前为本机构建版本，未公证。',
    visualNote: '预留：桌面效果 / 调色与透明度界面截图'
  },
  {
    id: 'uav-diagnostics', name: 'UAV Diagnostics', subtitle: '从飞行数据到可追溯的诊断', category: 'DATA / DIAGNOSTICS', theme: 'signals',
    url: 'https://github.com/mstknight/uav-diagnostics', image: '', imageAlt: 'UAV Diagnostics 数据质量与事件报告',
    summary: '先理解数据，再解释告警。',
    description: '源于无人机故障诊断研究、以 ALFA 飞行数据为背景的独立工程实现。围绕只读审计、数据隔离、探索性分类与事件回放，建立从输入检查到诊断报告的可追溯流程。',
    tags: ['Python', 'NumPy', 'IMU', '流式回放'],
    features: [
      ['数据质量与隔离', '检查传感器列、时间戳、缺失值和常量通道，记录内容指纹。按关联飞行分组构建候选划分，降低训练、验证和测试之间的数据泄漏风险。'],
      ['推理与事件', '将标签与推理输入分离，校验冻结模型契约，接收 JSONL 遥测分块输入。以连续窗口策略确认和结束告警，区分恢复、输入缺失及流结束。'],
      ['报告与健康检查', '导出 HTML、CSV 和 JSON 事件报告；提供故障注入压力测试、分组不确定性评估，以及外部 IMU 数据适配、采样质量与频谱等健康检查。']
    ],
    flow: ['只读审计', '分组划分', '流式回放', '事件报告'],
    boundary: '仍属研究与工程验证阶段；尚未完成完整五分类验证，也不是部署级实时诊断服务。数据健康线索不等于故障分类结论。',
    visualNote: '预留：数据质量面板 / 事件时间线与报告截图',
    access: '仓库可能需要访问权限'
  }
]
