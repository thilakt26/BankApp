package net.javatask.banking.controller;

import net.javatask.banking.dto.AccountDto;
import net.javatask.banking.service.AccountService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:63342")
@RequestMapping("/api/accounts/")
public class AccountController {

    private AccountService accountService;


    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    //Add account REST API
    @PostMapping("/")
    public ResponseEntity<AccountDto> addAccount(@RequestBody AccountDto accountDto){
        return new ResponseEntity<>(accountService.createAccount(accountDto), HttpStatus.CREATED);
    }

    //Get account REST API
    @GetMapping("/{id}")
    public ResponseEntity<AccountDto> getAccountByID(@PathVariable Long id){
        AccountDto accountDto=accountService.getAccountByID(id);
        return ResponseEntity.ok(accountDto);
    }

    //Deposit Rest API

    @PutMapping("/{id}/deposit")
    public ResponseEntity<AccountDto> deposit(@PathVariable Long id,
                                             @RequestBody Map<String,Double >request){
        Double amount=request.get("amount");
      AccountDto accountDto=  accountService.deposit(id,amount);
      return ResponseEntity.ok(accountDto);
    }

    //Withdraw Rest API
    @PutMapping("/{id}/withdraw")
    public ResponseEntity<AccountDto> withdraw(@PathVariable Long id,
                                               @RequestBody Map<String,Double >request){
        double amount=request.get("amount");
        AccountDto accountDto=  accountService.withdraw(id,amount);
        return ResponseEntity.ok(accountDto);

    }
    //Get AllAccounts REST API\\
    @GetMapping
    public ResponseEntity<List<AccountDto>> getAllAccounts(){
        accountService.getAllAccounts();
        List<AccountDto> accounts=accountService.getAllAccounts();
        return ResponseEntity.ok(accounts);
    }

    //Delete Account REST API
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAccount(@PathVariable Long id){
        accountService.deleteAccount(id);
        return  ResponseEntity.ok("Account is deleted Successfully");
    }


}
