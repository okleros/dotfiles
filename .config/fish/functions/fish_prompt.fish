function fish_prompt
    set -l prompt_symbol ' ➜  '

    # Check if in a Git repository
    set -l git_status (git status --porcelain 2> /dev/null)
    set -l git_branch (git rev-parse --abbrev-ref HEAD 2> /dev/null)

    # Prepare Git status indicators
    set -l git_indicator ''
    if test -n "$git_branch"
        set git_indicator "($git_branch)"

        # Initialize an empty string for the indicators
        set -l indicators ''

        # Check for different Git states
        if test -n "$git_status"
            # If there are uncommitted changes
            set indicators "$indicators$__fish_git_prompt_char_dirtystate "  # Uncommitted changes
        end

        # Check for staged changes
        if echo $git_status | grep -q '^A\|^M\|^D'
            set indicators "$indicators$__fish_git_prompt_char_stagedstate "  # Staged changes
        end

        # Check for untracked files
        if echo $git_status | grep -q '??'
            set indicators "$indicators$__fish_git_prompt_char_untrackedfiles "  # Untracked files
        end

        # Check for stashed changes
        if git stash list | grep -q 'stash@{'
            set indicators "$indicators$__fish_git_prompt_char_stashstate "  # Stashed changes
        end

        # Check for upstream status
        set -l upstream_status (git rev-parse --abbrev-ref --symbolic-full-name @{u} 2> /dev/null)
        if test -n "$upstream_status"
            set -l upstream_ahead (git rev-list --count $upstream_status..HEAD)
            set -l upstream_behind (git rev-list --count HEAD..$upstream_status)

            if test $upstream_ahead -gt 0
                set indicators "$indicators$__fish_git_prompt_char_upstream_ahead "  # Ahead of upstream
            end
            if test $upstream_behind -gt 0
                set indicators "$indicators$__fish_git_prompt_char_upstream_behind "  # Behind upstream
            end
        end

        # Enclose indicators in square brackets
        if test -n "$indicators"
            set indicators (string trim -- $indicators)
            set git_indicator "$git_indicator [$indicators]"  # Remove trailing space and enclose in brackets
        end
    end

    # Construct the prompt
    echo -s ' '(set_color --bold green) (date +%H:%M)' '\
    (set_color --bold -u cyan) $USER (set_color normal)' ' \
    (set_color magenta) (prompt_pwd)' ' \
    (set_color yellow) $git_indicator (set_color normal) \
    (set_color --bold bryellow) $prompt_symbol (set_color normal)
end


#function fish_prompt
#    set -l prompt_symbol ' ➜  '
#
#    echo -s ' '(set_color --bold green) (date +%H:%M)' '\
#    (set_color --bold -u cyan) $USER (set_color normal)' ' \
#    (set_color magenta) (prompt_pwd) \
#    (set_color --bold bryellow) $prompt_symbol (set_color normal)
#end
#    echo -n (date +%H:%M) (prompt_pwd)
#function fish_prompt -d "Write out the prompt"
#    set -l prompt_symbol ' ➜  '
#    printf '%s%s@%s%s %s%s%s%s%s' (set_color $fish_color_cwd) \
#    (whoami) (set_color normal) (hostname | cut -d . -f 1) \
#    (set_color $fish_color_cwd) (prompt_pwd) (set_color yellow) \
#    $prompt_symbol (set_color normal)
#end
