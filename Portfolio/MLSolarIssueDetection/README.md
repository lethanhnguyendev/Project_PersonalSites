# Project: Machine Learning for Electroluminescence (EL) Defect Detection in Solar Panels

## Introduction

![Top banner](TopBanner.png)


While working at Tido Solar as a machine operator, I had the opportunity to participate in a project focused on detecting defects in solar panels using Electroluminescence (EL) imaging.

**Electroluminescence (EL)** is a non-destructive testing method in which an electrical current is applied to a solar panel, causing its cells to emit infrared light. This emission is captured by a specialised camera, allowing internal defects to be identified even when they are not visible.

EL imaging can reveal several types of defects, with the most common being:
- **Cracks**: affecting performance and durability  
- **Soldering issues**: disrupting electrical connections  
- **Scratches**: degrading surface quality and efficiency  

<p align="center">
  <img src="T1.png" alt="T1" width="32%" />
  <img src="T2.png" alt="T2" width="32%" />
  <img src="T3.png" alt="T3" width="32%" />
</p>

<p align="center">
  <img src="T4.png" alt="T4" width="32%" />
  <img src="T5.png" alt="T5" width="32%" />
  <img src="T6.png" alt="T6" width="32%" />
</p>



In practice, the inspection process heavily relies on human observation, requiring technicians to analyse hundreds of images daily. This approach is time-consuming and prone to errors due to subjectivity and fatigue.

![EL banner](1773278339661.png)

To address these limitations, a machine learning–based solution was proposed to automate defect detection from EL images. The goal is to develop a model capable of accurately and efficiently identifying defects, thereby reducing inspection time, improving productivity, and supporting technicians in decision-making.

This project demonstrates the potential of applying artificial intelligence to enhance quality inspection processes in industrial environments.

![Screenshot — EL context](Screenshot%202026-03-07%20120639.png)

---

## System Architecture and Implementation

The project is organized into two main phases: the training phase and the implementation phase, forming a complete pipeline from data preparation to real-world deployment.


![Overall diagram](Overal%20Diagram.png)

*Overal diagram of training phase and implementation phase*

### 1. Training Phase

The training phase focuses on preparing data and building the machine learning model:


![Training process](Training%20Process.png)

*Training workflow: from data, labeling, and data augmentation to model training.*

- **Data Acquisition & Preprocessing**  
  High-resolution EL images (e.g., 5336×10856 and 4796×2868 pixels) were captured from EL inspection machines. These images were divided into smaller patches of 640×640 pixels to match model input requirements.

- **Data Annotation**  
  Technicians manually reviewed images and annotated defect regions using bounding boxes. Each defect was labeled with a class (crack, soldering issue, scratch).

- **Data Augmentation**  
  Techniques such as rotation (90°, 180°), flipping, and blurring were applied to improve dataset diversity and model generalization.

- **Dataset Splitting**  
  The dataset was split into 80% training and 20% validation sets. A YAML file was created for configuration.

- **Model Training**  
  The model was trained using YOLOv11 small version with Python, Visual Studio Code, and Google Colab.

![Training environment](Screenshot%202026-02-28%20184850.png)

*Using Visual Studio Code for training process.*

![Google Colab — 1](googlecolab_1.png)

*Using Google Colab for training process: storing data in Google Drive.*

![Google Colab — 2](googlecolab_2.png)

*Using Google Colab for training process: Setup the model and configuration before training.*

![Google Colab — 3](googlecolab_3.png)

*Using Google Colab for training process: Monitoring training process.*

- **Model Output**  
  The trained model weights were saved locally for deployment.

<p align="center">
  <img src="train_batch0.jpg" alt="Batch 0" width="32%" />
  <img src="train_batch1.jpg" alt="Batch 1" width="32%" />
  <img src="train_batch2.jpg" alt="Batch 2" width="32%" />
</p>

*Training Batches — Augmented image batches (Mosaic, flip, HSV) used for training.*

---

### 2. Implementation Phase

This phase focuses on deploying the trained model into the production environment:

- **API Development**


![Implementation process](Implement%20Process.png)

*API pipeline: split images into patches, run model inference, return JSON results.*

  1. Input images are split into 640×640 patches and stored in memory using Pillow library for image reading, cropping, drawing bounding boxes
  2. The trained model detects defects on each patch  
  3. Results are returned in JSON format (bounding box + class + confidence)



- **Visualization**  
  Detected defects are displayed by drawing bounding boxes and labels on the original image.

- **System Integration**  
  The API is integrated into the production line. Each EL scan automatically triggers defect detection.

- **Human-in-the-loop Verification**  
  The AI system supports technicians, who still perform manual verification.

- **Continuous Improvement**  
  New or misclassified samples are stored for future retraining to improve the model.

---

## Prototype Results


### [Click here to watch video demo — Part 1](https://www.youtube.com/watch?v=Hc9porv3HWE)

### [Click here to watch video demo — Part 2](https://www.youtube.com/watch?v=0seR3bU4ErQ)



### Application Interface


![Prototype 1](Screenshot%202026-03-07%20120639.png)

*Graphic User interface for detecting.*

<p align="center">
  <img src="Screenshot%202026-04-18%20171401.png" alt="Prototype 2" width="49%" />
  <img src="Screenshot%202026-04-18%20171348.png" alt="Prototype 3" width="49%" />
</p>

*Graphic User interface: changing confidence value and results.*

![Prototype 4](Screenshot%202026-03-07%20121237.png)

*V Scratch issue was detected*


![Prototype 5](Screenshot%202026-03-07%20121431.png)

*Single Scratch issue was detected*

![Result 1](1.png)

*Solder issues was detected and marked by red rectangle*

![Result 2](2.png)

*Scratch issues was detected and marked by blue rectangle*

![Result 3](3.png)

*Issues were detected and marked through the trained model*

![Result 4](4.png)

*Different issues were detected as red and blue color*

![Result 5](5.png)

*The confidence 0.85 which is more accuracy*

---

## Conclusion

The project has successfully achieved initial results in detecting common defects in solar panels using EL images. We also developed a basic graphic UI to evaluate model performance by adjusting confidence thresholds ranging from 0.5 to 0.9 for analysis. The results demonstrate the feasibility of applying machine learning to support defect inspection in production.

The project is still ongoing, with further improvements expected in terms of accuracy, robustness, and real-world integration. Future work will focus on enhancing the model and expanding the dataset to achieve better performance and reliability.
