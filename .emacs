;;; Configurações básicas
;; ----------------------

;; Remove barra de título
;; (setq default-frame-alist '((undecorated . t)))

;; Remover barras
(tool-bar-mode -1)
(menu-bar-mode -1)
(scroll-bar-mode -1)

;; Remover boas-vindas
(setq inhibit-startup-screen t)

;; Fonte e aparência
(set-face-attribute 'default nil :font "Victor Mono-10" :height 115)
(setq custom-tab-width 4)
(setq tab-width custom-tab-width)
(setq indent-tabs-mode nil) ;; usar espaços em vez de tabs
(setq c-basic-offset tab-width)

;; Números nas linhas
(global-display-line-numbers-mode t)

;;; Gerenciador de Pacotes
;; ------------------------

(require 'package)
(setq package-enable-at-startup nil)

;; MELPA - repo
(add-to-list 'package-archives '("melpa" . "https://melpa.org/packages/"))

(unless (package-installed-p 'use-package)
  (package-refresh-contents)
  (package-install 'use-package))

;;; Pacotes e Configurações
;; --------------------------

(use-package smex
  :ensure t
  :bind (("M-x" . smex)
         ("C-c M-x" . smex-major-mode-commands)))

(use-package which-key
  :ensure t
  :config
  (which-key-setup-side-window-right-bottom)
  (which-key-mode))

(use-package auto-complete
  :ensure t
  :init
  (ac-config-default)
  (global-auto-complete-mode t))

(use-package all-the-icons
  :ensure t
  :if (display-graphic-p))

(use-package neotree
  :ensure t
  :bind (("C-\\" . 'neotree-toggle))
  :config
  (setq neo-theme (if (display-graphic-p) 'icons 'arrow)))

(use-package ace-window
  :ensure t
  :bind (("C-x o" . 'ace-window)))

(use-package timu-caribbean-theme
  :ensure t
  :config
  (load-theme 'timu-caribbean t)
  (setq timu-caribbean-org-intense-colors t)
  (setq timu-caribbean-mode-line-border t))

(use-package flycheck
  :ensure t
  :init (global-flycheck-mode t))

(use-package multiple-cursors
  :ensure t)

;;; Meus atalhos
;; -------------

(global-set-key (kbd "C-<tab>") 'other-window)
(global-set-key (kbd "M-<down>") 'enlarge-window)
(global-set-key (kbd "M-<up>") 'shrink-window)
(global-set-key (kbd "M-<left>") 'enlarge-window-horizontally)
(global-set-key (kbd "M-<right>") 'shrink-window-horizontally)
(global-set-key (kbd "C-x c") 'compile)
(global-set-key (kbd "C-c s") 'shell)

;; Atalhos do multiple-cursors
(global-set-key (kbd "C-S-c C-S-c") 'mc/edit-lines)
(global-set-key (kbd "C->") 'mc/mark-next-like-this)
(global-set-key (kbd "C-<") 'mc/mark-previous-like-this)
(global-set-key (kbd "C-c C-<") 'mc/mark-all-like-this)

;; Configurações personalizadas (não alteradas)
(custom-set-variables
 ;; custom-set-variables was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(ansi-color-faces-vector
   [default default default italic underline success warning error])
 '(custom-safe-themes
   '("69f7e8101867cfac410e88140f8c51b4433b93680901bb0b52014144366a08c8"
     "4df2cb7ac1a6a1651a5a288f7ae8b475b1b821641849b348474e25d5549bd2d9"
     default))
 '(ispell-dictionary nil)
 '(package-selected-packages nil)
 '(timu-caribbean-mode-line-border t)
 '(timu-caribbean-org-intense-colors nil))

(custom-set-faces
 ;; custom-set-faces was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 )
