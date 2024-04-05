describe("TodoList",()=>{
    beforeEach(() => {
        cy.visit("http://127.0.0.1:5500/index.html")
    });

    it('Deve ser possivel adicionar uma nova tarefa clicando no botão "Criar tarefa".', () => {
        cy.get('#todo_title').type('Correr')
        cy.get('[data-cy="createdTask"]').click()
        cy.get('#todo_title').type('Nadar')
        cy.get('[data-cy="createdTask"]').click()
        cy.contains('Correr').should('be.visible');
        cy.contains('Nadar').should('be.visible');
    });

    it('Deve ser possivel adicionar uma nova tarefa pressionando ENTER.', () => {
        cy.get('#todo_title').type('Estudar{enter}')
        cy.get('[x-text="todo.task"]').should('have.text', 'Estudar')
    });

    it('Deve ser possivel verificar data e hora de quando a tarefa foi criada.', () => {
        cy.get('#todo_title').type('trabalhar{enter}')
        cy.get('[x-text="getFormatedDate(todo.createdAt)"]').should('not.be.empty')
    })

    it('Deve ser possivel remover uma tarefa.', () => {
        cy.get('#todo_title').type('teste{enter}')
        cy.get('[x-text="todo.task"]').should('have.text', 'teste')
        cy.get('.text-end > .btn').click()
        cy.contains('teste').should('not.exist');
    });

    it('Deve ser possivel filtrar tarefas concluídas.', () => {
        cy.get('#todo_title').type('Estudar{enter}')
        cy.get('#todo_title').type('Ler{enter}')
        cy.get('#todo_title').type('dormir{enter}')
        cy.get(':nth-child(4) > :nth-child(1) > .form-check-input').click()
        cy.get('.pt-3 > .col-auto > .btn').select(1)
        cy.contains('Ler').should('be.visible');
        cy.contains('Estudar').should('be.visible');
        cy.contains('dormir').should('not.exist');
    });

    it('Deve ser possivel visualizar número total de tarefas.', () => {
        cy.get('#todo_title').type('Estudar{enter}')
        cy.get('#todo_title').type('Ler{enter}')
        cy.get('.mb-3').should('have.text', 'Tarefas cadastradas: 2')

    });

})
