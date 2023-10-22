(define-constant ERR-NOT-AUTHORIZED (err u1))
(define-constant ERR-INVALID-AMOUNT (err u2))
(define-constant ERR-INSUFFICIENT-BALANCE (err u3))
(define-constant ERR-INSUFFICIENT-STSTX (err u4))

(define-constant pox-addr (tuple (version 0x05) (hashbytes 0x7321b74e2b6a7e949e6c4ad313035b1665095017)))

;; Define a map that stoers whos staking and how much stSTX they have

;; Define the staking contract
;; sender sends STX to this contract
;; This contract mints the liquid token 1:1 back to the sender

;; data map keeps track of whos staked STX and howmuch
(define-map stSTX-balances principal uint)

(define-private (get-user-stSTX-balance (sender principal)) 
(unwrap! (contract-call? .stacked-stx get-balance sender) u0))

(define-private (get-contract-stx-balance) 
    (stx-get-balance (as-contract tx-sender)))

(define-read-only (get-STX-balance (who principal))
    (ok (stx-get-balance who))
)

(define-public (stake-stx (stx-amount uint))
    (let (
      (current-amount (default-to u0 (map-get? stSTX-balances tx-sender)))
      (new-amount (+ current-amount stx-amount))
    )
        (asserts! (> stx-amount u0) ERR-INVALID-AMOUNT)
        ;; send STX from tx-sender to the contract
        (try! (stx-transfer? stx-amount tx-sender (as-contract tx-sender)))
        ;; send tokens from tx-sender to the contract
        (try! (contract-call? .stacked-stx mint stx-amount tx-sender))
        (map-set stSTX-balances tx-sender new-amount)
        (ok new-amount)
    )
  )

(define-public (unstake-stx (token-amount uint))
    (let (
      (user-stSTX-balance (get-user-stSTX-balance tx-sender))
      (user-address tx-sender)
      (contract-address (as-contract tx-sender))
      (current-amount (default-to u0 (map-get? stSTX-balances tx-sender)))
      (new-amount (- current-amount token-amount))
    )
        (asserts! (> token-amount u0) ERR-INVALID-AMOUNT)
        ;; check user has more stacked stx than stx 
        (asserts! (>= user-stSTX-balance token-amount) ERR-INSUFFICIENT-STSTX)
        ;; transfer users stSTX to contrct
        (try! (contract-call? .stacked-stx transfer token-amount tx-sender (as-contract tx-sender)  (some 0x0000000000000000000000000000000000)))
        ;; ;; transfer equivalent STX to users account from contract
        (try! (as-contract (stx-transfer? token-amount contract-address user-address)))
        ;; ;; burn the equivalent amount of stSTX tokens transferred
        (try! (contract-call? .stacked-stx burn token-amount (as-contract tx-sender)))
        (map-set stSTX-balances tx-sender new-amount)
        (ok new-amount)
    )
  )

;; write pox staking function
(define-public (stake-all-stx (first-reward-cycle uint) (lock-period uint))
  (let (
    (contract-stx-balance (get-contract-stx-balance))
  )
    (try! (contract-call? .PoX-3 stack-stx contract-stx-balance pox-addr first-reward-cycle lock-period))    (ok contract-stx-balance)
  )
)

;; write payout function