;; Tela cheia
(add-hook 'window-setup-hook 'toggle-frame-maximized t)

;; Variável personalizada própria
(setq custom-tab-width 4)

;; Auto-complete para C-x C-f
(ido-mode 1)

(global-set-key (kbd "M-x") 'smex)
(global-set-key (kbd "M-x") 'smex-major-mode-commands)
(global-set-key (kbd "C-c C-c M-x") 'execute-extended-command)

;; Fonte padrão
(set-frame-font "Ubuntu Mono-14" nil t)

;; Remover boas vindas
(setq inhibit-startup-screen t)

;; Remover menus
(tool-bar-mode -1)
(menu-bar-mode -1)

;; Remover barra de rolagem
(scroll-bar-mode -1)

;; Números nas linhas
(global-linum-mode t)

;; Tamanho da fonte
(set-face-attribute 'default nil :height 115)

;; Tamanho do TAB
(setq c-basic-offset custom-tab-width)

(defun disable-tabs () (setq indent-tabs-mode nil))
(defun enable-tabs ()
  (local-set-key (kbd "TAB") 'tab-to-tab-stop)
  (setq indent-tabs-mode t)
  (setq-default tab-width custom-tab-width))

;; Pacotes
(require 'package)
(setq package-enable-at-startup nil) ;; desabilitar início de ativação

;; MELPA - repo
(add-to-list 'package-archives '("melpa" . "https://melpa.org/packages/"))

(unless (package-installed-p 'use-package)
  (package-refresh-contents)
  (package-install 'use-package))

(use-package try
  :ensure t)

(use-package smex
  :ensure t)

(use-package which-key
  :ensure t
  :config
  (progn
    (which-key-setup-side-window-right-bottom)
    (which-key-mode)))

(use-package auto-complete
  :ensure t
  :init
  (progn
    (ac-config-default)
    (global-auto-complete-mode t)))

(use-package all-the-icons
  :ensure t
  :if (display-graphic-p))

(use-package neotree
  :ensure t
  :bind (("C-\\" . 'neotree-toggle))
  :config (setq neo-theme (if (display-graphic-p) 'icons 'arrow)))

(use-package ace-window
  :ensure t
  :bind (("C-x o" . 'ace-window)))

(use-package gruber-darker-theme
 :ensure
 :config (load-theme 'gruber-darker t))

(use-package flycheck
  :ensure t
  :init (global-flycheck-mode t))

(customize-set-variable 'timu-caribbean-org-intense-colors t)
(customize-set-variable 'timu-caribbean-mode-line-border t)

;;(use-package ergoemacs-mode
;;  :ensure t
;;  :config
;;  (progn
;;    (setq ergoemacs-theme nil)
;;    (setq ergoemacs-keyboard-layout "us")
;;    (ergoemacs-mode 1)))

;;(ergoemacs-mode nil)

;; Meus atalhos
(global-set-key (kbd "C-<tab>") 'other-window)
(global-set-key (kbd "M-<down>") 'enlarge-window)
(global-set-key (kbd "M-<up>") 'shrink-window)
(global-set-key (kbd "M-<left>") 'enlarge-window-horizontally)
(global-set-key (kbd "M-<right>") 'shrink-window-horizontally)
(global-set-key (kbd "C-c c") 'compile)
(global-set-key (kbd "C-c s") 'shell)

;; Coisas automáticas do melpa
(custom-set-variables
 ;; custom-set-variables was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(ansi-color-faces-vector
   [default default default italic underline success warning error])
 '(custom-safe-themes
   '("69f7e8101867cfac410e88140f8c51b4433b93680901bb0b52014144366a08c8" "4df2cb7ac1a6a1651a5a288f7ae8b475b1b821641849b348474e25d5549bd2d9" default))
 '(ispell-dictionary nil)
 '(package-selected-packages
   '(flycheck smex gruber-darker-theme timu-macos-theme timu-macos modus-themes timu-caribbean-theme ace-window all-the-icons neotree auto-complete which-key try use-package))
 '(timu-caribbean-mode-line-border t t)
 '(timu-caribbean-org-intense-colors nil t))
(custom-set-faces
 ;; custom-set-faces was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 )
