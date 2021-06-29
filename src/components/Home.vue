<template>
   <b-container>
       <b-row>
            <b-col sm="12" class="center">
                <h1>Busca Endereço</h1>
                <p>Digite o cep ou o logradouro para buscar o endereço</p>
            </b-col>
       </b-row>
           <b-card class="shadow mt-4 pl-3 center" sm="12">
                   <b-form-group label="Selecione o tipo de busca" >
                       <b-row class="mt-2">
                        <b-col>
                            <b-form-radio v-model="tipoBusca" inline  name="tipobusca" value="cep" v-on:change="clearFields">CEP</b-form-radio>
                        </b-col>
                        <b-col>
                            <b-form-radio v-model="tipoBusca" inline  name="tipobusca" value="endereco" v-on:change="clearFields">Logradouro</b-form-radio>
                        </b-col>
                       </b-row>
                    </b-form-group>
               
               <b-row class="center mt-4" v-if="tipoBusca=='cep'">
                   <b-col sm="2" md="2" class="mt-2">
                       <label for="cep">Digite o CEP</label>
                   </b-col>
                    <b-col sm="2" md="2" class="mt-2">
                        <b-input type="number" name="cep" id="cep" v-model="cep" />
                    </b-col>
               </b-row>
                <b-row class="center mt-4" v-if="tipoBusca=='endereco'">
                     <b-col sm="2" md="2" class="mt-2">
                       <label for="logradouro">Endereço</label>
                   </b-col>
                    <b-col sm="2" md="2" class="mt-2">
                            <b-input name="logradouro" id="logradouro" v-model="endereco.logradouro"/>
                    </b-col>
                      <b-col sm="2" md="2" class="mt-2">
                       <label for="cidade">Cidade</label>
                   </b-col>
                    <b-col sm="3" md="3" class="mt-2">
                            <b-input name="cidade" id="cidade" v-model="endereco.cidade" />
                    </b-col>
                      <b-col sm="1" md="1" class="mt-2">
                       <label for="UF">UF</label>
                   </b-col>
                    <b-col sm="1" md="1" class="mt-2">
                           <b-select :options="uf" v-model="endereco.uf"></b-select>
                    </b-col>
               </b-row>
                <b-row class="center" v-if="tipoBusca!=''">
                    <b-col sm="2" md="2" class="mt-2 center">
                        <b-button variant="dark" v-on:click="getCep">Buscar</b-button>
                    </b-col>
                </b-row>
            </b-card>
            <b-card class="mt-4 shadow p-2" v-if="retorno!=''">
                <div v-if="retorno.cep">
                    <b-form>
                        <b-form-group label="CEP" >
                            <b-form-input readonly :value="retorno.cep" />
                        </b-form-group>
                        <b-form-group label="Logradouro" >
                            <b-form-input readonly :value="retorno.logradouro" />
                        </b-form-group>
                         <b-form-group label="Cidade" >
                            <b-form-input readonly :value="retorno.localidade" />
                        </b-form-group>
                         <b-form-group label="UF" >
                            <b-form-input readonly :value="retorno.uf" />
                        </b-form-group>
                         <b-form-group label="IBGE" >
                            <b-form-input readonly :value="retorno.ibge" />
                        </b-form-group>
                         <b-form-group label="DDD" >
                            <b-form-input readonly :value="retorno.ddd" />
                        </b-form-group>
                    </b-form>
                </div>
                <div v-else-if="retorno[0].cep">
                <p>Foram encontrados {{retorno.length}} resultados</p>
                <b-list-group v-for="item in retorno" :key="item.cep" class="mt-4">
                    <b-list-group-item>CEP: {{item.cep}}</b-list-group-item>
                    <b-list-group-item>Logradouro: {{item.logradouro}}</b-list-group-item>
                    <b-list-group-item>Bairro: {{item.bairro}}</b-list-group-item>
                    <b-list-group-item>Cidade: {{item.localidade}}</b-list-group-item>
                    <b-list-group-item>UF: {{item.uf}}</b-list-group-item>
                    <b-list-group-item>DDD: {{item.ddd}}</b-list-group-item>
                    <b-list-group-item>IBGE: {{item.ibge}}</b-list-group-item>
                </b-list-group>
                </div>
                <div v-else>
                    {{retorno}}
                </div>
             </b-card>

      
   </b-container>
</template>

<script>
export default {
    name: 'Home',
    data: function() {
        return {
            cep:'',
            endereco:{
                logradouro: '',
                cidade:'',
                uf:''
            },
            retorno:'',
            tipoBusca:'',
            uf:[
                {value:'AC', text:'AC'},
                {value:'AL', text:'AL'},
                {value:'AM', text:'AM'},
                {value:'AP', text:'AP'},
                {value:'BA', text:'BA'},
                {value:'CE', text:'CE'},
                {value:'DF', text:'DF'},
                {value:'ES', text:'ES'},
                {value:'GO', text:'GO'},
                {value:'MA', text:'MA'},
                {value:'MG', text:'MG'},
                {value:'MS', text:'MS'},
                {value:'MT', text:'MT'},
                {value:'PA', text:'PA'},
                {value:'PB', text:'PB'},
                {value:'PE', text:'PE'},
                {value:'PI', text:'PI'},
                {value:'PR', text:'PR'},
                {value:'RJ', text:'RJ'},
                {value:'RN', text:'RN'},
                {value:'RO', text:'RO'},
                {value:'RR', text:'RR'},
                {value:'RS', text:'RS'},
                {value:'SC', text:'SC'},
                {value:'SE', text:'SE'},
                {value:'SP', text:'SP'},
                {value:'TO', text:'TO'},
            ]
        }
    },
    methods: {
        getCep: function(){
            var url=''
            var vm = this;
             vm.retorno= ''
            if (vm.cep.trim()!=''){
                url = 'https://viacep.com.br/ws/'+vm.cep+'/json/'
                vm.endereco.logradouro= '';
                 vm.endereco.cidade= '';
                  vm.endereco.uf= '';
            } else if (vm.endereco.logradouro.trim()!='' && vm.endereco.cidade.trim()!='' && vm.endereco.uf!=''){
                url = 'https://viacep.com.br/ws/'+vm.endereco.uf+'/'+vm.endereco.cidade+'/'+vm.endereco.logradouro+'/json/'
                vm.cep= '';
            }
            if(url!= ''){
                console.log(url)
                vm.$http.get(url).then(function(response){
                    
                    console.log(response.data)
                    if(response.data.erro || response.data.length==0){
                        vm.retorno = "Endereço não encontrado"
                    } else {
                        vm.retorno = response.data
                    }
                    return vm.retorno
                }).catch(function(error){
                    console.log(error)
                    vm.retorno = "Endereço não encontrado"
                })
            } else {
                alert( 'Preencha todos os campos')
            }
        },
        clearFields: function() {
            var vm=this;
            if(vm.tipoBusca=='cep'){
                vm.endereco.logradouro='',
                vm.endereco.cidade='',
                vm.endereco.uf=''
            } else{
                vm.cep= ''
            }
        }
    },
}
</script>

<style lang="scss" scoped>

</style>