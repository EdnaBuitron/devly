var databaseHandler = {
    db: null,
    createDatabase: function(){
        this.db = window.sqlitePlugin.openDatabase({name: 'field.db', location: 'default', androidDatabaseProvider: 'system'});
        this.db.transaction(
            function(tx){
                // General
                tx.executeSql(
                    "create table if not exists Actualizaciones (idActualizacion integer primary key,IdUsuario integer, Fecha text)",
                    [],
                    function(tx, results){
                        // console.log("Se creo Actualizaciones correctamente!");
                    },
                    function(tx, error){
                        console.error("Error al crear la tabla de cedulas_general: " + error.message);
                    }
                );
                tx.executeSql(
                    "create table if not exists cedulas_general(id_cedula integer primary key,tipo_cedula text,id_usuario integer,nombre_usuario text,fecha_entrada text,geolocalizacion_entrada text,id_cliente text,nombre_cliente text,horario_programado text,calificacion text,fecha_salida text,geolocalizacion_salida text,estatus integer,comentario_cliente text,nombre_evalua text)",
                    [],
                    function(tx, results){
                        // console.log("Se creo cedulas_general correctamente!");
                    },
                    function(tx, error){
                        console.error("Error al crear la tabla de cedulas_general: " + error.message);
                    }
                );
                var empresa = localStorage.getItem("nombre_empresa");
                // Levantamiento
                tx.executeSql(
                    "create table if not exists levantamiento_servicio(id_levantamiento integer primary key,id_cedula integer,foto_entrada blob,nombre_cliente text,direccion text,colonia text,revision text,grado_infeccion integer,descripcion text,comentarios_tecnico text, firma_cliente blob,fecha_cliente text,foto_salida blob)",
                    [],
                    function(tx, results){
                        // console.log("Se creo levantamiento de servicios correctamente!");
                    },
                    function(tx, error){
                        console.error("Error al crear la tabla de levantamiento_servicio: " + error.message);
                    }
                );
                tx.executeSql(
                    "create table if not exists levantamiento_evidencia(id_levantamiento_foto integer primary key,id_cedula integer,area text, foto_plaga blob,descripcion_plaga text,observacion text,fecha_regristro text)",
                    [],
                    function(tx, results){
                        // console.log("Se creo levantamiento correctamente!");
                    },
                    function(tx, error){
                        console.error("Error al crear la tabla de levantamiento: " + error.message);
                    }
                );
                // Fumigacion
                tx.executeSql(
                    "create table if not exists fumigacion(id_fumigacion integer primary key,id_cedula integer,foto_entrada blob,sucursal text,direccion text,persona_recibe text,documento_ingresar text,alcance_servicio text,foto_quimico blob,foto_equipo blob,descripcion_antes text,descripcion_durante text,descripcion_despues text,foto_reporte blob,producto_utilizado text,tipo_aplicacion integer,descripcion_tipo text,grado_infestacion integer,descripcion_infestacion text,mantenimiento integer,detalle_mantenimiento text,recomendaciones text,firma_evalua blob,fecha_firma text,comentario_cliente text,foto_salida blob)",
                    [],
                    function(tx, results){
                        // console.log("Se creo fumigacion correctamente!");
                    },
                    function(tx, error){
                        console.error("Error al crear la tabla de levantamiento: " + error.message);
                    }
                );
                tx.executeSql(
                    "create table if not exists fotos_fumigacion(id_fumigacion_foto integer primary key,id_cedula integer,fase integer,foto_area blob,nombre_area text,fecha_foto text)",
                    [],
                    function(tx, results){
                        // console.log("Se creo fotos fumigacion correctamente!");
                    },
                    function(tx, error){
                        console.error("Error al crear la tabla de levantamiento: " + error.message);
                    }
                );
                // Sanitizacion
                tx.executeSql(
                    "create table if not exists sanitizacion(id_sanitizacion integer primary key,id_cedula integer,foto_entrada blob,sucursal text,direccion text,persona_recibe text,documento_ingresar text,descripcion_antes text,foto_quimico blob,foto_equipo blob,areas_despejadas integer,descripcion_durante text,descripcion_despues text,foto_reporte blob,recomendaciones text,firma_evalua blob,fecha_firma text,foto_salida blob)",
                    [],
                    function(tx, results){
                        // console.log("Se creo sanitizacion correctamente!");
                    },
                    function(tx, error){
                        console.error("Error al crear la tabla de levantamiento: " + error.message);
                    }
                );
                tx.executeSql(
                    "create table if not exists fotos_sanitizacion(id_sanitizacion_foto integer primary key,id_cedula integer,fase integer,foto_area blob,nombre_area text,fecha_foto text)",
                    [],
                    function(tx, results){
                        // console.log("Se creo fotos sanitizacion correctamente!");
                    },
                    function(tx, error){
                        console.error("Error al crear la tabla de levantamiento: " + error.message);
                    }
                );
                
                if(empresa == "DIPREC"){
                    tx.executeSql(
                        "create table if not exists servicio_tecnico(id_servicio integer primary key,id_cedula integer,foto_entrada blob,nombre_cliente text,atencion text,documento_ingresar text,direccion text,telefono text,email text,tipo_servicio text,firma_cliente blob,fecha_cliente text,foto_salida blob,puesto text)",
                        [],
                        function(tx, results){
                            // console.log("Se creo Servicio tecnico DIPREC correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla de levantamiento_smc: " + error.message);
                        }
                    );
                    tx.executeSql(
                        "create table if not exists datos_equipo(id_equipo integer primary key,id_cedula integer,equipo text,marca text,modelo text,no_serie text,fecha_registro text)",
                        [],
                        function(tx, results){
                            // console.log("Se creo datos del equipo DIPREC correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla de levantamiento_smc: " + error.message);
                        }
                    );
                    tx.executeSql(
                        "create table if not exists evidencia_equipo(id_foto integer primary key,fase text,id_cedula integer,foto blob,equipo text,fecha_regristro text)",
                        [],
                        function(tx, results){
                            // console.log("Se creo evidencia del equipo DIPREC correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla de levantamiento_smc: " + error.message);
                        }
                    );
                    tx.executeSql(
                        "create table if not exists datos_equipo_antes(id_datos integer primary key,id_cedula integer,equipo text,voltaje text,estado_voltaje text,evidencia_voltaje blob,corriente text,estado_corriente text,evidencia_corriente text,fases text,estado_fase text,evidencia_fase text,tipo_gas text,estado_gas text,evidencia_gas text,presion_gas text,estado_presion_gas text,evidencia_presion_gas blob,presion_vapor text,estado_presion_vapor text,evidencia_presion_vapor blob,temperatura text,estado_temperatura text,evidencia_estado_temperatura blob,falla_reportada text)",
                        [],
                        function(tx, results){
                            // console.log("Se creo datos del equpo - antes DIPREC correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla de levantamiento_smc: " + error.message);
                        }
                    );
                    tx.executeSql(
                        "create table if not exists evidencia_refacciones(id_foto integer primary key,id_cedula integer,fase text,clave text,cantidad text,descripcion text,foto blob,fecha_regristro text)",
                        [],
                        function(tx, results){
                            // console.log("Se creo evidencia de refacciones DIPREC correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla de levantamiento_smc: " + error.message);
                        }
                    );
                    tx.executeSql(
                        "create table if not exists check_list(id_check integer primary key,id_cedula integer,equipo text,gabinete_exterior integer,gabinete_interior integer,quemadores integer,paneles integer,parillas integer,vulvas_espreas integer,paneles_control integer,condensador integer,evaporador integer,motores integer,compresor integer,flautas integer,sistema_hidraulico integer,sistema_lavado integer,empaques integer,dereccion_fugas integer,ajuste_electrico integer,libricacion integer,revision_operacion integer,filtro_aire integer)",
                        [],
                        function(tx, results){
                            // console.log("Se creo check list DIPREC correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla de levantamiento_smc: " + error.message);
                        }
                    );
                    tx.executeSql(
                        "create table if not exists check_list2(id_check2 integer primary key,id_cedula integer,equipo text,vulvas integer,termostato integer,control_presion integer,sensor_flama integer,quemadores integer,turbinas integer,resistencias integer,sondas integer,tarjeta_electronica integer,compresor integer,motor_difusores ineger,aspas integer,contractores integer,fuga_tuberia integer,aislante_tuberia integer,condfensador integer,iluminacion integer,empaques integer,fuga integer)",
                        [],
                        function(tx, results){
                            // console.log("Se creo check list2 DIPREC correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla de levantamiento_smc: " + error.message);
                        }
                    );
                    tx.executeSql(
                        "create table if not exists datos_equipo_despues(id_datos integer primary key,id_cedula integer,equipo text,voltaje text,estado_voltaje text,evidencia_voltaje blob,corriente text,estado_corriente text,evidencia_corriente text,fases text,estado_fase text,evidencia_fase text,tipo_gas text,estado_gas text,evidencia_gas text,presion_gas text,estado_presion_gas text,evidencia_presion_gas blob,presion_vapor text,estado_presion_vapor text,evidencia_presion_vapor blob,temperatura text,estado_temperatura text,evidencia_estado_temperatura blob,falla_reportada text)",
                        [],
                        function(tx, results){
                            // console.log("Se creo datos del equipo - Despues correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla de levantamiento_smc: " + error.message);
                        }
                    );
                    tx.executeSql(
                        "create table if not exists minuta_coordinador(id_servicio integer primary key,id_cedula integer,foto_entrada blob,empresa text,coordinador_obra text,nombre_cliente text,proyecto text,coordonador text,direccion text,firma_cliente blob,fecha_cliente text,foto_salida blob,puesto text)",
                        [],
                        function(tx, results){
                            // console.log("Se creo minuta coordinador DIPREC correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla de levantamiento_smc: " + error.message);
                        }
                    );
                    tx.executeSql(
                        "create table if not exists zonas_coordinador(id_zona integer primary key,id_cedula integer,nombre text,foto blob,fecha_registro text)",
                        [],
                        function(tx, results){
                            // console.log("Se creo zonas coordinador DIPREC correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla de levantamiento_smc: " + error.message);
                        }
                    );
                    tx.executeSql(
                        "create table if not exists equipos_coordinador(id_equipo integer primary key,id_cedula integer,zona text,equipo text,foto blob,fecha_registro text)",
                        [],
                        function(tx, results){
                            // console.log("Se creo equipos coordinador DIPREC correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla de levantamiento_smc: " + error.message);
                        }
                    );
                    
                    tx.executeSql(
                        "create table if not exists datos_coordinador(id_dato integer primary key,id_cedula integer,zona text,equipo text,voltaje text,estado_voltaje text,evidencia_voltaje blob,corriente text,estado_corriente text,evidencia_corriente text,fases text,estado_fase text,evidencia_fase text,tipo_gas text,estado_gas text,evidencia_gas text,presion_gas text,estado_presion_gas text,evidencia_presion_gas blob,presion_vapor text,estado_presion_vapor text,evidencia_presion_vapor blob,temperatura text,estado_temperatura text,evidencia_temperatura text,evidencia_estado_temperatura text,falla_reportada text)",
                        [],
                        function(tx, results){
                            // console.log("Se creo datos coordinador DIPREC correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla de levantamiento_smc: " + error.message);
                        }
                    );
                    tx.executeSql(
                        "create table if not exists observaciones(id_acuerdo integer primary key,id_cedula integer,acuerdo text,foto blob,fecha_registro text)",
                        [],
                        function(tx, results){
                            // console.log("Se creo observaciones coordinador DIPREC correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla de levantamiento_smc: " + error.message);
                        }
                    );
                    
                    tx.executeSql(
                        "create table if not exists notas(id_nota integer primary key,id_cedula integer,nota text,foto blob,fecha_registro text)",
                        [],
                        function(tx, results){
                            // console.log("Se creo notas coordinador DIPREC correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla de levantamiento_smc: " + error.message);
                        }
                    );
                }
                if(empresa == "SMC"){
                    //Levantamiento SMC
                    tx.executeSql(
                        "create table if not exists levantamiento_smc(id_levantamiento integer primary key,id_visita text,id_cedula integer,foto_entrada blob,nombre_cliente text,nombre_contacto text,telefono_contacto text,correo_contacto text,orden_servicio text,marca text,modelo text,numero_serie text,tipo_motor text,tipo_boquilla text,tipo_combustible text,tipo_mastil text,comentario_equipo text,lugar_reparacion integer,reparo_visita text, firma_cliente blob,fecha_cliente text,foto_salida blob)",
                        [],
                        function(tx, results){
                            // console.log("Se creo levantamiento SMC correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla de levantamiento_smc: " + error.message);
                        }
                    );
                    ///Fotos de levantamiento SMC
                    tx.executeSql(
                        "create table if not exists evidencia_levantamiento_smc(id_evidencia integer primary key,id_cedula integer,observacion text, foto_observacion blob,fecha_regristro text)",
                        [],
                        function(tx, results){
                            // console.log("Se creo Evidencia levantamiento SMC correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla de evidencia de levantamiento SMC: " + error.message);
                        }
                    );
                    //Mantenimiento SMC
                    tx.executeSql(
                        "create table if not exists mantenimiento_smc(id_levantamiento integer primary key,id_visita text,id_cedula integer,foto_entrada blob,nombre_cliente text,nombre_contacto text,telefono_contacto text,correo_contacto text,tipo_servicio integer,orden_servicio text,marca text,modelo text,numero_serie text,foto_equipo blob, firma_cliente blob,fecha_cliente text,foto_salida blob)",
                        [],
                        function(tx, results){
                            // console.log("Se creo mantenimiento SMC correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla de levantamiento_smc: " + error.message);
                        }
                    );
                    ///Fotos de mantenimiento SMC
                    tx.executeSql(
                        "create table if not exists evidencia_mantenimiento_smc(id_evidencia integer primary key,id_cedula integer,fase text,descripcion text, foto_decripcion blob,fecha_regristro text)",
                        [],
                        function(tx, results){
                            // console.log("Se creo evidencia mantenimiento SMC correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla de evidencia de levantamiento SMC: " + error.message);
                        }
                    );
                    //Ventas SMC
                    tx.executeSql(
                        "create table if not exists ventaSMC(id_venta integer primary key,id_visita text,id_cedula integer,foto_entrada blob,nombre_cliente text,rfc_cliente text,nombre_contacto text,telefono_contacto text,correo_contacto integer,tipo_visita text,comentario_antes text,comentario_despues text,observaciones_prospeccion text,estado_monta text,numero_monta text,tipo_monta text,marca text,mantenimiento text,objetivo_prospeccion text,necesidad_prospeccion text,marca_montacargas_prospeccion text,numero_montacargas_prospeccion text,status_montacarga_prospeccion integer,venc_contrato text,marca_llantas_prospeccion text,tipo_llantas_prospeccion text,mediadas_prospeccion text,resolvio_prospeccion integer,por_que_prospeccion text,vista_prospeccion integer,cuando_prospeccion text,presente_prospeccion integer,cuales_prospeccion text,copetencia_prospeccion text,sugerencia_prospeccion text,comentarios_prospeccion text,no_activo text,no_contrato text,conclusion_servicio text,orden_servicio text,firma_cliente blob,fecha_cliente text,foto_salida blob)",
                        [],
                        function(tx, results){
                            // console.log("Se creo venta smc correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla de ventaSMC: " + error.message);
                        }
                    );
                    tx.executeSql(
                        "create table if not exists evidencia_venta_smc(id_evidencia integer primary key,id_cedula integer,comentario text,fase text,foto blob,fecha_regristro text)",
                        [],
                        function(tx, results){
                            // console.log("Se creo evidencia venta SMC correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla de evidencia de venta SMC: " + error.message);
                        }
                    );
                    tx.executeSql(
                        "create table if not exists datos_equipo_smc(id_equipo integer primary key,id_cedula integer,marca text,tipo_motor text,marca_motor text,modelo text,serie text,aditamentos text)",
                        [],
                        function(tx, results){
                            // console.log("Se creo datos de equipo SMC correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla de datos de equipo SMC: " + error.message);
                        }
                    );
                    //Servicio
                    tx.executeSql(
                        "create table if not exists servicioSMC(id_venta integer primary key,id_visita text,id_cedula integer,foto_entrada blob,nombre_cliente text,rfc_cliente text,nombre_contacto text,telefono_contacto text,correo_contacto integer,tipo_visita text,comentario_antes text,comentario_despues text,observaciones_prospeccion text,estado_monta text,numero_monta text,tipo_monta text,marca text,mantenimiento text,no_activo text,no_contrato text,conclusion_servicio text,orden_servicio text,firma_cliente blob,fecha_cliente text,foto_salida blob)",
                        [],
                        function(tx, results){
                            // console.log("Se creo venta smc correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla de ventaSMC: " + error.message);
                        }
                    );
                    tx.executeSql(
                        "create table if not exists evidencia_servicio_smc(id_evidencia integer primary key,id_cedula integer,comentario text,fase text,foto blob,fecha_regristro text)",
                        [],
                        function(tx, results){
                            // console.log("Se creo evidencia venta SMC correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla de evidencia de venta SMC: " + error.message);
                        }
                    );
                    tx.executeSql(
                        "create table if not exists datos_servicio_smc(id_equipo integer primary key,id_cedula integer,marca text,tipo_motor text,marca_motor text,modelo text,serie text,aditamentos text)",
                        [],
                        function(tx, results){
                            // console.log("Se creo datos de equipo SMC correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla de datos de equipo SMC: " + error.message);
                        }
                    );
                }
                if(empresa == "Field"){
                    //Levantamiento SMC
                    tx.executeSql(
                        "create table if not exists levantamiento_Field(id_levantamiento integer primary key,id_cedula integer,foto_entrada blob,nombre_cliente text,nombre_contacto text,telefono_contacto text,correo_contacto text,orden_servicio text,marca text,modelo text,numero_serie text,tipo_motor text,tipo_boquilla text,tipo_combustible text,tipo_mastil text,comentario_equipo text,lugar_reparacion integer,reparo_visita text, firma_cliente blob,fecha_cliente text,foto_salida blob)",
                        [],
                        function(tx, results){
                            // console.log("Se creo levantamiento Field correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla de levantamiento_smc: " + error.message);
                        }
                    );
                    ///Fotos de levantamiento Field
                    tx.executeSql(
                        "create table if not exists evidencia_levantamiento_Field(id_evidencia integer primary key,id_cedula integer,observacion text, foto_observacion blob,fecha_regristro text)",
                        [],
                        function(tx, results){
                            // console.log("Se creo Evidencia levantamiento Field correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla de evidencia de levantamiento Field: " + error.message);
                        }
                    );
                    //Mantenimiento SMC
                    tx.executeSql(
                        "create table if not exists mantenimiento_Field(id_levantamiento integer primary key,id_cedula integer,foto_entrada blob,nombre_cliente text,nombre_contacto text,telefono_contacto text,correo_contacto text,tipo_servicio integer,orden_servicio text,marca text,modelo text,numero_serie text,foto_equipo blob, firma_cliente blob,fecha_cliente text,foto_salida blob)",
                        [],
                        function(tx, results){
                            // console.log("Se creo mantenimiento Field correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla de levantamiento_Field: " + error.message);
                        }
                    );
                    ///Fotos de mantenimiento SMC
                    tx.executeSql(
                        "create table if not exists evidencia_mantenimiento_Field(id_evidencia integer primary key,id_cedula integer,fase text,descripcion text, foto_decripcion blob,fecha_regristro text)",
                        [],
                        function(tx, results){
                            // console.log("Se creo evidencia mantenimiento Field correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla de evidencia de levantamiento Field: " + error.message);
                        }
                    );
                }
                if(empresa == "Bennetts"){
                    tx.executeSql(
                        "create table if not exists datos_productos(id_producto integer primary key, id_cedula integer, puesto text, firma_cliente blob, correo text)",
                        [],
                        function(tx, results){
                            // console.log("Se creo Productos bennetts correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla de cedulas_general: " + error.message);
                        }
                    );
                    tx.executeSql(
                        "create table if not exists productos(id_producto integer primary key, id_cedula integer, codigo_producto text, descripcion_producto text, cantidad_producto integer, aplica text, motivo text, evidencia_foto_antes blob, evidencia_foto_despues blob, fecha text)",
                        [],
                        function(tx, results){
                            // console.log("Se creo Productos bennetts correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla de cedulas_general: " + error.message);
                        }
                    );
                    tx.executeSql(
                        "create table if not exists inventario(id_inventario integer primary key,id_cedula integer,id_conteo_general integer,numero_conteo integer,empresa text,pareja_almacen text,almacen text)",
                        [],
                        function(tx, results){
                            // console.log("Se creo Inventario bennetts correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla de inventario bennetts: " + error.message);
                        }
                    );
                    tx.executeSql(
                        "create table if not exists conteo(id_conteo integer primary key,id_cedula integer,id_conteo_general integer,numero_conteo integer,codigo_proveedor text,codigo_sap text,ubicacion text,descripcion text,inventario text,familia text,costo_unitario text,usuario text,estatus_diferencia text,fisico text,enviado text)",
                        [],
                        function(tx, results){
                            // console.log("Se creo Conteo bennetts correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla de conteo bennetts: " + error.message);
                        }
                    );
                }
                if(empresa == "SURO"){
                    tx.executeSql(
                       "create table if not exists evidencia(id_evidencia integer primary key,id_cedula integer, nombre_grupo text,foto_evidencia blob,fases text,fecha_foto text)",
                       [],
                       function(tx, results){
                        //    console.log("Se creó evidencia SURO correctamente!");
                       },
                       function(tx, error){
                           console.error("Error al crear la tabla evidencia: " + error.message);
                       }
                   );
                   //GRUPOS SURO
                   tx.executeSql(
                       "create table if not exists grupos(id_grupo integer primary key,id_cedula integer,nombre_grupo text, fases text, indice integer)",
                       [],
                       function(tx, results){
                        //    console.log("Se creo grupos SURO correctamente!");
                       },
                       function(tx, error){
                           console.error("Error al crear la tabla grupos SURO: " + error.message);
                       }
                   );
                    //SANITIZACIÓN SURO
                    tx.executeSql(
                        "create table if not exists sanitizacion_Suro(id_sanitizacion integer primary key,id_cedula integer,nombre_cliente text, foto_entrada blob, sucursal text, direccion text, correo text, nombre_usuario text, foto_epp blob, foto_maquina blob, foto_aspersor blob, foto_quimico blob, foto_accesos blob, foto_delimita_area blob, fecha_foto_epp text, fecha_foto_maquina text, fecha_foto_aspersor text, fecha_foto_quimico text, fecha_foto_acceso text, fecha_foto_area text,firma_cliente blob,fecha_cliente text,foto_salida blob,puesto text)",
                        [],
                        function(tx, results){
                        //    console.log("Se creo sanitización SURO correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla sanitización SURO: " + error.message);
                        }
                    );
                    tx.executeSql(
                        "create table if not exists Seguimiento(id_seguimiento integer primary key,id_cedula integer,fecha text,sitio text,motivo text,observacion text,comentarios text, nombre_cliente text)",
                        [],
                        function(tx, results){
                          console.log("Se creo sanitización Seguimiento correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla Seguimiento SURO: " + error.message);
                        }
                    );
                    tx.executeSql(
                        "create table if not exists VisitaB_SURO(id_visitab integer primary key,id_cedula integer,responsable text, pendientes text, fecha text,sitio text,gestion1 text, gestion2 text, gestion3 text, gestion4 text, gestion5 text, gestion6 text, gestion7 text, gestion8 text, gestion9 text,frecuencia1 text, frecuencia2 text, frecuencia3 text,frecuencia4 text,almacen1 text,almacen2 text, almacen3 text,almacen4 text, recorrido1 text, recorrido2 text, recorrido3,nombre_afanador text,observaciones text,comentarios text,numero_ti text,nombre_cliente text)",
                        [],
                        function(tx, results){
                          console.log("Se creo sanitización VisitaB_SURO correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla VisitaB_SURO: " + error.message);
                        }
                    );
                    tx.executeSql(
                        "create table if not exists Recorrido_SURO(id_recorrido integer primary key,id_cedula integer,Nombre_remitente text,fecha_envio text,ubicacion text,Nombre_sitio text,Pregunta_bodega text,Comentarios_bodega text,Pregunta_maq1 text,Pregunta_maq2 text,Comentarios_maq text,nombre_cliente text, puesto text, puesto_re text)",
                        [],
                        function(tx, results){
                          console.log("Se creo sanitización Recorrido_SURO correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla sanitización SURO: " + error.message);
                        }
                    );
                    tx.executeSql(
                        "create table if not exists Visita_SURO(id_visita integer primary key,id_cedula integer,Nombre_remitente text, fecha_envio text,ubicacion text,Nombre_sitio text,motivo_vista text,cali_limpieza text,cali_ejecutivo text,cali_gerente text,Comentarios text,compromiso text,nombre_cliente text)",
                        [],
                        function(tx, results){
                          console.log("Se creo sanitización Visita_SURO correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla sanitización SURO: " + error.message);
                        }
                    );
                    tx.executeSql(
                        "create table if not exists Encuesta_SURO(id_encuesta integer primary key,id_cedula integer,Nombre_remitente text, fecha_envio text,ubicacion text,pregunta1 text,pregunta2 text,pregunta3 text,pregunta4 text,pregunta5 text,pregunta6 text,pregunta7 text, comentarios1 text,comentarios2 text,comentarios3 text,comentarios4 text,comentarios5 text,comentarios6 text,comentarios7 text,nombre_cliente text,nombre_sitio text)",
                        [],
                        function(tx, results){
                          console.log("Se creo sanitización Encuesta_SURO correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla sanitización SURO: " + error.message);
                        }
                    );
                    tx.executeSql(
                        "create table if not exists Fotos_SURO(id_fotos integer primary key,id_cedula integer,titulo text, foto blob, fecha text,recorrido text, proceso text)",
                        [],
                        function(tx, results){
                        console.log("Se creo sanitización Fotos_SURO correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla sanitización SURO: " + error.message);
                        }
                    );
               }
               if(empresa == "MerGroup"){
                    tx.executeSql(
                        "Create table if not exists reporteFotografico(id_reporte integer primary key,id_cedula integer,id_visita integer,foto_entrada blob,orden_compra text,nombre_cliente text,sitio text,contratista text,tipo_proyecto text,region text,torre text,proceso text,foto_salida blob,firma_cliente blob,fecha_cliente text)",
                        [],
                        function(tx,results){
                            // console.log("Se creo reporte Fotografico MerGroup correctamente!")
                        },
                        function(tx,results){
                            console.error("Error al crear la tabla checklist serv")
                        }                
                    );
                    tx.executeSql(
                        "Create table if not exists evidenciaFotografica(id_evidencia integer primary key,id_cedula integer,titulo text,observacion text,foto blob,fecha_registro text)",
                        [],
                        function(tx,results){
                            console.log("Se creo evidencia Fotografica MerGroup correctamente!")
                        },
                        function(tx,results){
                            console.error("Error al crear la tabla de evidencia MerGroup serv")
                        }                
                    ); 
               }
               if(empresa == "MT"){
                    tx.executeSql(
                        "Create table if not exists datos_visita(id_visita integer primary key,id_cedula integer,nombre_cliente text,nombre_contacto text,puesto_contacto text,telefono_contacto text,correo_contacto text)",
                        [],
                        function(tx,results){
                            // console.log("Se creo reporte Visita Cliente MT correctamente!")
                        },
                        function(tx,results){
                            console.error("Error al crear la tabla checklist serv")
                        }                
                    );
               }
               if(empresa == "CarnesIdeal"){
                    tx.executeSql(
                        "Create table if not exists datos_entrega(id_entrega integer primary key,id_cedula integer,foto_entrada blob,id_cliente text,nombre_cliente text,nombre_contacto text,puesto_contacto text,telefono_contacto text,correo_contacto text,temperatura text,unidad text,nombre_usuario text,firma_cliente blob,fecha_cliente text,foto_salida blob)",
                        [],
                        function(tx,results){
                            // console.log("Se creo Entrada Carnes Ideal correctamente!")
                        },
                        function(tx,results){
                            console.error("Error al crear la tabla checklist serv")
                        }                
                    );
                    tx.executeSql(
                        "Create table if not exists fotos_entrega(id_evidencia integer primary key,id_cedula integer,foto blob,comentarios text,fecha_evidencia text)",
                        [],
                        function(tx,results){
                            // console.log("Se creo Evidencias Entrega Carnes Ideal correctamente!")
                        },
                        function(tx,results){
                            console.error("Error al crear la tabla checklist serv")
                        }                
                    );
                    //Ventas
                    tx.executeSql(
                        "create table if not exists proyectos(id_proyecto integer primary key,id_usuario integer,nombre_proyecto text,potencial text,segmento text,division integer, fecha_creacion text, estatus integer, enviado integer)",
                        [],
                        function(tx, results){
                           console.log("Se creo Proyectos Carnes Ideal correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla proyecto_VIC: " + error.message);
                        }
                    );
                    tx.executeSql(
                        "create table if not exists datos_ventas(id_ventas integer primary key, id_cedula integer, foto_inicio blob, nombre_cliente text, puesto_cliente text, telefono text, correo text, firma_cliente blob, foto_salida blob, id_proyecto int, tipo_visita text, foto_visita blob, nivel text, pendiente_vendedor text,nivel_sube text)",
                        [],
                        function(tx, results){
                           console.log("Se creo Ventas Carnes Ideal correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla ventas_bennetts: " + error.message);
                        }
                    );
                    tx.executeSql(
                        "create table if not exists minuta(id_minuta integer primary key, id_cedula integer, tema text, compromiso text, fecha text, foto blob, fecha_foto text, h_inicio text, h_fin text)",
                        [],
                        function(tx, results){
                         //    console.log("Se creo APOYO VIC correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla evidencias: " + error.message);
                        }
                    );
                } if(empresa == "VIC"){
                    //tabla de apoyo VIC
                    tx.executeSql(
                        "create table if not exists apoyo_bennetts(id_apoyo integer primary key, id_cedula integer, foto_entrada blob, nombre_cliente text, id_cliente text, nombre_comercial text, nombre_contacto text, telefono text, correo text, estatus_cliente text, firma_cliente blob, fecha_cliente text, foto_salida blob)",
                        [],
                        function(tx, results){
                            //    console.log("Se creo APOYO VIC correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla APOYO BENNETTS: " + error.message);
                        }
                    );
                 //TABLA DE FOTOS DE APOYO
                 tx.executeSql(
                     "create table if not exists fotos_apoyo(id_foto_apoyo integer primary key, id_cedula integer, foto blob, tipo_apoyo text, comentario text, fechaYHora text)",
                     [],
                     function(tx, results){
                      //    console.log("Se creo APOYO VIC correctamente!");
                     },
                     function(tx, error){
                         console.error("Error al crear la tabla fotos_apoyo VIC: " + error.message);
                     }
                 );
                 tx.executeSql(
                    "create table if not exists ventas_bennetts(id_ventas integer primary key, id_cedula integer, foto_inicio blob, nombre_cliente text, puesto_cliente text, telefono text, correo text, firma_cliente blob, foto_salida blob, id_proyecto integer, tipo_visita text, foto_visita blob, nivel text, pendiente_vendedor text,fecha_inicio text,fecha_final text,correo_apoyo text,actividadSelect text)",
                    [],
                    function(tx, results){
                     //    console.log("Se creo ventas VIC correctamente!");
                    },
                    function(tx, error){
                        console.error("Error al crear la tabla ventas_bennetts: " + error.message);
                    }
                );
                tx.executeSql(
                    "create table if not exists minuta(id_minuta integer primary key, id_cedula integer, tema text, compromiso text, fecha text, foto blob, fecha_foto text, h_inicio text, h_fin text)",
                    [],
                    function(tx, results){
                     //    console.log("Se creo APOYO VIC correctamente!");
                    },
                    function(tx, error){
                        console.error("Error al crear la tabla evidencias: " + error.message);
                    }
                );
                tx.executeSql(
                    "create table if not exists proyectos_vic(id_proyecto integer primary key, id_usuario integer, nombre_proyecto text, potencial text, segmento text, division integer, fecha_creacion text, estatus integer, enviado integer,estrategia text,metodo text,grupo text, nombre_cliente text, puesto_cliente text, telefono text, correo text,nivel text)",
                    [],
                    function(tx, results){
                    //    console.log("Se creo proyectosVIC correctamente!");
                    },
                    function(tx, error){
                        console.error("Error al crear la tabla proyecto_VIC: " + error.message);
                    }
                );
                 //vic 2
                 tx.executeSql(
                    "create table if not exists datosVIC(id_datos integer primary key, id_cedula integer, foto_inicio blob, id_cliente text, nombre_cliente text, nombre_comercial text, nombre_contacto text , telefono text, correo text, estatus_cliente text, firma_cliente blob, foto_salida blob, observaciones_generales text, estado_cuenta text, tipo_visita text, permite_almacen text, persona_cuenta text, correo_cuenta text,pregunta_equipo text, pregunta_img text, pregunta_entrena text, pregunta_pedido text)",
                    [],
                    function(tx, results){
                     //    console.log("Se creo APOYO VIC correctamente!");
                    },
                    function(tx, error){
                        console.error("Error al crear la tabla datos_VIC: " + error.message);
                    }
                );
                 tx.executeSql(
                     "create table if not exists equiposVIC(id_equipos integer primary key, id_cedula integer, estado text, descripcion text, equipo text, cantidad integer, ubicacion text, motivo text, comentarios text, foto blob, fecha text)",
                     [],
                     function(tx, results){
                      //    console.log("Se creo APOYO VIC correctamente!");
                     },
                     function(tx, error){
                         console.error("Error al crear la tabla equipos_VIC: " + error.message);
                     }
                 );
                 tx.executeSql(
                     "create table if not exists imagenVIC(id_imagen integer primary key, id_cedula integer, tipo integer, estado text, cantidad integer, ubicacion text, comentarios text,  foto blob, fecha text)",
                     [],
                     function(tx, results){
                      //    console.log("Se creo APOYO VIC correctamente!");
                     },
                     function(tx, error){
                         console.error("Error al crear la tabla imagen_VIC: " + error.message);
                     }
                 );
                 tx.executeSql(
                     "create table if not exists entrenaVIC(id_entrena integer primary key, id_cedula integer, tipo integer, persona_capacita text, puesto_capacita text, tema_capacita text, comentarios text, foto blob, fecha text)",
                     [],
                     function(tx, results){
                      //    console.log("Se creo APOYO VIC correctamente!");
                     },
                     function(tx, error){
                         console.error("Error al crear la tabla entrena_VIC: " + error.message);
                     }
                 );
                 tx.executeSql(
                     "create table if not exists almacenVIC(id_almacen integer primary key, id_cedula integer, observaciones text, foto blob, fecha text)",
                     [],
                     function(tx, results){
                      //    console.log("Se creo APOYO VIC correctamente!");
                     },
                     function(tx, error){
                         console.error("Error al crear la tabla almacen_VIC: " + error.message);
                     }
                 );
                 tx.executeSql(
                     "create table if not exists pedidosVIC(id_producto integer primary key, id_cedula integer, producto text, codigo text, descripcion text, inventario_dia text, cantidad_solicitada integer, comentarios text)",
                     [],
                     function(tx, results){
                      //    console.log("Se creo APOYO VIC correctamente!");
                     },
                     function(tx, error){
                         console.error("Error al crear la tabla pedidos_VIC: " + error.message);
                     }
                 );
                 tx.executeSql(
                    "create table if not exists equiposCargados(id_equipo integer primary key, id_cliente text, codigo text, descripcion text, id_usuario int, enviado int)",
                    [],
                    function(tx, results){
                     //    console.log("Se creo APOYO VIC correctamente!");
                    },
                    function(tx, error){
                        console.error("Error al crear la tabla equipos_VIC: " + error.message);
                    }
                );
                 tx.executeSql(
                     "Create table if not exists VIC_Fotos(ID_Fotos integer primary key,ID_Cedula integer,pregunta integer,FechaHora text,Foto blob,orden text)",
                     [],
                     function(tx,results){
                        //   console.log("Se creo VIC_Fotos correctamente!")
                     },
                     function(tx,results){
                         console.error("Error al crear la tabla VIC_Fotos")
                     }                
                 ); 
                 tx.executeSql(
                     "Create table if not exists VIC_Respuesta(id_respuesta integer primary key, id_cedula integer,orden integer,id_pregunta integer, respuesta text,recomendacion text,fecha text,obligatorio integer,factor text)",
                     [],
                     function(tx,results){
                        //   console.log("Se creo VIC_Respuesta correctamente!")
                     },
                     function(tx,results){
                         console.error("Error al crear la tabla VIC_Respuesta")
                     }             
                 );
                 //Ventas
                 tx.executeSql(
                    "create table if not exists datos_contacto(id_contacto integer primary key, id_cedula integer,id_proyecto integer, nombre_cliente text, puesto_cliente text, telefono text, correo text)",
                    [],
                    function(tx, results){
                     //    console.log("Se creo datos_contacto correctamente!");
                    },
                    function(tx, error){
                        console.error("Error al crear la tabla datos_contacto: " + error.message);
                    }
                );
                tx.executeSql("create table if not exists apoyo_venta_vic(id_avv integer primary key, id_cedula integer, proyecto text, companero text, comentario text,fecha text)",
                    [],
                    function(tx, results){
                    //    console.log("Se creo APOYO VIC correctamente!");
                    },
                    function(tx, error){
                        console.error("Error al crear la tabla evidencias: " + error.message);
                    }
                );
             }
            //Inicio DILIMPIO
            if(empresa == "Dilimpio"){
                tx.executeSql(
                    "create table if not exists visitaDilimpio(id_datos integer primary key, id_cedula integer, foto_inicio blob, id_cliente text, nombre_cliente text, nombre_contacto text , correo text, telefono text, id_visita text, firma_cliente blob, foto_salida blob, observaciones_generales text, estado_cuenta text, permite_almacen text, persona_cuenta text, correo_cuenta text)",
                    [],
                    function(tx, results){
                     //    console.log("Se creo visitaDilimpio correctamente!");
                    },
                    function(tx, error){
                        console.error("Error al crear la tabla visitaDilimpio: " + error.message);
                    }
                );
                tx.executeSql(
                    "create table if not exists equiposDL(id_equipos integer primary key, id_cedula integer, estado text, descripcion text, equipo text, cantidad integer, ubicacion text, motivo text, comentarios text, foto blob, fecha text)",
                    [],
                    function(tx, results){
                    //    console.log("Se creo APOYO VIC correctamente!");
                    },
                    function(tx, error){
                        console.error("Error al crear la tabla equipos_VIC: " + error.message);
                    }
                );
                tx.executeSql(
                    "create table if not exists imagenDL(id_imagen integer primary key, id_cedula integer, tipo integer, estado text, cantidad integer, ubicacion text, comentarios text,  foto blob, fecha text)",
                    [],
                    function(tx, results){
                    //    console.log("Se creo APOYO VIC correctamente!");
                    },
                    function(tx, error){
                        console.error("Error al crear la tabla imagen_VIC: " + error.message);
                    }
                );
                tx.executeSql(
                    "create table if not exists entrenaDL(id_entrena integer primary key, id_cedula integer, tipo integer, persona_capacita text, puesto_capacita text, tema_capacita text, comentarios text, foto blob, fecha text)",
                    [],
                    function(tx, results){
                    //    console.log("Se creo APOYO VIC correctamente!");
                    },
                    function(tx, error){
                        console.error("Error al crear la tabla entrena_VIC: " + error.message);
                    }
                );
                tx.executeSql(
                    "create table if not exists almacenDL(id_almacen integer primary key, id_cedula integer, observaciones text, foto blob, fecha text)",
                    [],
                    function(tx, results){
                    //    console.log("Se creo APOYO VIC correctamente!");
                    },
                    function(tx, error){
                        console.error("Error al crear la tabla almacen_VIC: " + error.message);
                    }
                );
                tx.executeSql(
                    "create table if not exists pedidosDL(id_producto integer primary key, id_cedula integer, producto text, codigo text, descripcion text, inventario_dia text, cantidad_solicitada integer, comentarios text)",
                    [],
                    function(tx, results){
                    //    console.log("Se creo APOYO VIC correctamente!");
                    },
                    function(tx, error){
                        console.error("Error al crear la tabla pedidos_VIC: " + error.message);
                    }
                );
                tx.executeSql(
                    "create table if not exists equiposCargadosDL(id_equipo integer primary key, id_cliente text, codigo text, descripcion text, id_usuario int, enviado int)",
                    [],
                    function(tx, results){
                        //    console.log("Se creo APOYO VIC correctamente!");
                    },
                    function(tx, error){
                        console.error("Error al crear la tabla equipos_VIC: " + error.message);
                    }
                );
                tx.executeSql(
                    "create table if not exists DatosentregasDL(id_datos integer primary key, id_cedula integer, foto_inicio blob, id_cliente text, nombre_cliente text, nombre_contacto text , correo text, telefono text, id_visita text, firma_cliente blob, foto_salida blob)",
                    [],
                    function(tx, results){
                     //    console.log("Se creo APOYO VIC correctamente!");
                    },
                    function(tx, error){
                        console.error("Error al crear la tabla entregasDL: " + error.message);
                    }
                );
                tx.executeSql(
                    "create table if not exists entregasDL(id_entrega integer primary key, id_cedula integer, foto_entrega blob, comentarios text, fecha text)",
                    [],
                    function(tx, results){
                     //    console.log("Se creo APOYO VIC correctamente!");
                    },
                    function(tx, error){
                        console.error("Error al crear la tabla entregasDL: " + error.message);
                    }
                );
            }
            //Fin DILIMPIO
            //Inicio ServInd
            if(empresa == "ServInd"){
                tx.executeSql(
                    "create table if not exists encuesta_serv (id_encuesta integer primary key, id_cedula integer, id_calendar integer, fecha_visita text, recomienda integer, rapidez integer, capacidad integer, atencion integer, satisfaccion integer, fecha_encuesta text)",
                    [],
                    function(tx, results){
                      //console.log("Se creo datos_generales correcto");
                    },
                    function(tx, error){
                        console.error("Error al crear la tabla datos generales Serv: " + error.message);
                    }
                );
                tx.executeSql(
                    "create table if not exists visita_servInd(id_visita integer primary key, id_cedula integer, no_orden text, fecha text, foto_llegada blob, tipo_servicio text, id_cliente integer, cliente text, nombre_comercial text, sucursal_cliente text, direccion text, ciudad text, telefono text, correo text, equipo text, marca text, modelo text, serie text, ml text, voltaje text, amp text, wc text, tierra_fisica text, falla_reportada text, como_encontro integer, foto_diagnostico blob, comentarios_entrega text, diagnotico_corecto text, trabajo_realizado text, como_entrego integer, papeleta text, refacciones text, viaticos text, H_viaje text, H_espera text, H_trabajo text, H_totales text, firma_cliente blob,firma_tecnico blob ,foto_sello blob, foto_salida blob, id_equipo text)",
                    [],
                    function(tx, results){
                      //console.log("Se creo datos_generales correcto");
                    },
                    function(tx, error){
                        console.error("Error al crear la tabla datos generales Serv: " + error.message);
                    }
                );
                tx.executeSql(
                    "create table if not exists checklist_servind(id_pregunta integer primary key,id_cedula integer,fase text,pregunta text,tipo text,valor text,no_pregunta integer,id_equipo text)",
                    [],
                    function(tx, results){
                      //console.log("Se creo datos_generales correcto");
                    },
                    function(tx, error){
                        console.error("Error al crear la tabla checklist Serv: " + error.message);
                    }
                );
                tx.executeSql(
                    "create table if not exists fotos_check(id_foto integer primary key, id_cedula integer, foto blob, pregunta text, fase text, observaciones text, fecha_foto text,no_pregunta integer,id_equipo text)",
                    [],
                    function(tx, results){
                      //console.log("Se creo datos_generales correcto");
                    },
                    function(tx, error){
                        console.error("Error al crear la tabla checklist Serv: " + error.message);
                    }
                );
                tx.executeSql(
                    "Create table if not exists papeleta(id_papeleta integer primary key,id_cedula integer,foto_papeleta blob, numero_parte text,descripcion text,prioridad text,cantidad text,fecha_registro text,id_equipo text, motivo_pr text)",
                    [],
                    function(tx,results){
                        // console.log("Se creo equipos reporte general Serv correctamente!")
                    },
                    function(tx,results){
                        console.error("Error al crear la tabla checklist serv")
                    }                
                ); 
                tx.executeSql(
                    "Create table if not exists refacciones(id_refaccion integer primary key,id_cedula integer,foto_refa blob, numero_parte text,descripcion text,parte text,fecha_registro text,id_equipo text)",
                    [],
                    function(tx,results){
                        // console.log("Se creo equipos reporte general Serv correctamente!")
                    },
                    function(tx,results){
                        console.error("Error al crear la tabla checklist serv")
                    }                
                );
                tx.executeSql(
                    "create table if not exists datos_generales_serv(id_datos integer primary key, id_cedula integer, no_orden text, fecha text, foto_llegada blob, tipo_servicio text, id_cliente integer, cliente text, nombre_comercial text, sucursal_cliente text, direccion text, ciudad text, telefono text, correo text, equipo text, marca text, modelo text, serie text, ml text, firma_cliente blob, firma_tecnico blob, foto_sello blob, foto_salida blob)",
                    [],
                    function(tx, results){
                      //console.log("Se creo datos_generales correcto");
                    },
                    function(tx, error){
                        console.error("Error al crear la tabla datos generales Serv: " + error.message);
                    }
                );////tabla de diagnostico rational 
                tx.executeSql(
                    "create table if not exists diagnostico_servInd(id_diagnostico integer primary key, id_cedula integer,foto_diagnostico blob,falla_en text, diagnostico text, sw text, usbInfo text,usbHa text, filtro text, extracion text)",
                    [],
                    function(tx, results){
                      //console.log("Se creo diagnostico_servInd correcto");
                    },
                    function(tx, error){
                        console.error("Error al crear la tabla datos generales Serv: " + error.message);
                    }
                );
                tx.executeSql(
                    "create table if not exists tpms(id_checkTPM integer primary key,id_cedula integer,id_tpm text,pregunta_tpm text, valor text)",
                    [],
                    function(tx, results){
                      //console.log("Se creo datos_generales correcto");
                    },
                    function(tx, error){
                        console.error("Error al crear la tabla checklist Serv: " + error.message);
                    }
                );
                tx.executeSql(
                    "create table if not exists diagnosticos_PMP(id_diagnosticos integer primary key, id_cedula integer,comentario_cliente text, diagnostico text)",
                    [],
                    function(tx, results){
                      //console.log("Se creo diagnostico_servInd correcto");
                    },
                    function(tx, error){
                        console.error("Error al crear la tabla datos generales Serv: " + error.message);
                    }
                );
                tx.executeSql(
                    "create table if not exists datos_eq (id_datos integer primary key, id_cedula integer,marca text,modelo text,serie text,numero_id text,volts text, amp text,tierra text,breaker text,fase text,estatus text, observaciones tex,nombre text,papeleta text, refacciones text, viaticos text, ml text, wc text, comentarios_entrega text, trabajo_realizado text, como_entrego text)",
                    [],
                    function(tx, results){
                    console.log("Se creo encuesta_serv correcto");
                    },
                    function(tx, error){
                        console.error("Error al crear la tabla encuesta Serv: " + error.message);
                    }
                );
                tx.executeSql(
                    "create table if not exists diagnostico_servIndHBE(id_diagnostico integer primary key, id_cedula integer,comentario text,pregunta text)",
                    [],
                    function(tx, results){
                      //console.log("Se creo diagnostico_servIndHBE correcto");
                    },
                    function(tx, error){
                        console.error("Error al crear la tabla datos generales Serv: " + error.message);
                    }
                );
                tx.executeSql(
                    "create table if not exists fotos_diagnostico(id_foto integer primary key, id_cedula integer, foto blob, fecha text,tipo text)",
                    [],
                    function(tx, results){
                      //console.log("Se creo fotos_diagnostico correcto");
                    },
                    function(tx, error){
                        console.error("Error al crear la tabla checklist Serv: " + error.message);
                    }
                );
            }
            //Fin de ServInd
                if(empresa == "PlatoLimpio"){
                    tx.executeSql(
                        "create table if not exists DG_PlatoL(DG_ID integer primary key,DG_ID_Cedula integer, DG_Empresa text,DG_CEmpleados integer,DG_FechaA text,DG_HoraA text, DG_Contacto text, DG_Puesto text, DG_Correo text,DG_Movil text,DG_CA_Bitacora integer,DG_PRL_Observaciones text, DG_FHC_Observaciones text, DG_FHC_Manuales integer,DG_CE_Notas text, DG_CE_Lavaloza text,CC integer, FH integer, SN integer,Nombre_R text,Comentarios_Cierre text)",
                        [],
                        function(tx,results){
                            //console.log("Se creo DG_PlatoL correctamente!")
                        },
                        function(tx,results){
                            console.error("Error al crear la tabla DG_PlatoL")
                        }
                    );
                    //Ciclo_Charola
                    tx.executeSql( 
                        "Create table if not exists Ciclo_Charola(CC_ID integer primary key,CC_Responsable text ,CC_ID_Cedula integer, CC_tipo text,CC_Etapa integer,CC_Escala integer,CC_Oportunidad text,CC_Comentario text)",
                        [],
                        function(tx,results){
                            //console.log("Se creo Ciclo_Charola correctamente!")
                        },
                        function(tx,results){
                            console.error("Error al crear la tabla Ciclo_Charola")
                        }
                    );
                    //FactorHumano
                    tx.executeSql(
                        "Create table if not exists Factor_Humano(FH_ID integer primary key, FH_ID_Cedula integer,FH_Puesto integer, FH_Capacitacion text, FH_Certificacion text, FH_Observacion text, FH_Manuales integer )",
                        [],
                        function(tx,result){
                            //console.log("Se creo Factor_Humano correctamente!")
                        },
                        function(tx,result){
                            console.error("Error al crear la tabla Factor_Humano");
                        }
                    );
                    tx.executeSql(
                        "Create table if not exists Info_Equipo(IE_ID integer primary key, IE_ID_Cedula integer,IE_Modelo text, IE_NS text, IE_Ubicacion text, IE_Fecha text,IE_Uso text,IE_Consumo text,IE_Agua text, IE_Suministro text)",
                        [],
                        function(tx,result){
                            //console.log("Se creo Info_Equipo correctamente!")
                        },
                        function(tx,result){
                            console.error("Error al crear la tabla Info_Equipo");
                        }
                    );
                    tx.executeSql(
                        "Create table if not exists Capa_Equipo_A(CE_ID integer primary key, CE_ID_Cedula integer,CE_Turno integer, CE_Horario text, CE_Cantidad text)",
                        [],
                        function(tx,result){
                            //console.log("Se creo Capa_EquipoA correctamente!")
                        },
                        function(tx,result){
                            console.error("Error al crear la tabla Capa_EquipoA");
                        }
                    );            
                    tx.executeSql(
                        "Create table if not exists Capa_Equipo_B(CE_ID integer primary key, CE_ID_Cedula integer, CE_Utencilio integer, CE_Cantidad text, CE_Tipo text, CE_Material text )",
                        [],
                        function(tx,result){
                            //console.log("Se creo Capa_EquipoB correctamente!")
                        },
                        function(tx,result){
                            console.error("Error al crear la tabla Capa_EquipoB");
                        }
                    );
                    tx.executeSql(
                        "Create table if not exists Tipo_Sistema(TS_ID integer primary key, TS_ID_Cedula integer,TS_Equipo integer,TS_Boiler text , TS_Booster text, TS_Maquina text, TS_Observacion text)",
                        [],
                        function(tx,result){
                            //console.log("Se creo Tipo_Sistema correctamente!")
                        },
                        function(tx,result){
                            console.error("Error al crear la tabla Tipo_Sistema");
                        }
                    );
                    tx.executeSql(
                        "Create table if not exists Prueba_Calidad_Agua(PCA_ID integer primary key, PCA_ID_Cedula integer,PCA_Tipo integer,PCA_Dureza text, PCA_Partes text,PCA_Sitema integer)",
                        [],
                        function(tx,result){
                            //console.log("Se creo Prueba_Calidad_Agua correctamente!")
                        },
                        function(tx,result){
                            console.error("Error al crear la tabla Prueba_Calidad_Agua");
                        }
                    );
                    tx.executeSql(
                        "Create table if not exists Insumos_A(ID integer primary key, ID_Cedula integer, Equipo integer, Marca text, Modelo text,Dosificador text)",
                        [],
                        function(tx,result){
                            //console.log("Se creo Prueba_Calidad_Agua correctamente!")
                        },
                        function(tx,result){
                            console.error("Error al crear la tabla Prueba_Calidad_Agua");
                        }
                    );
                    tx.executeSql(
                        "Create table if not exists Insumos_B(ID integer primary key, ID_Cedula integer, Dosificador integer, Marca text, Modelo text)",
                        [],
                        function(tx,result){
                            //console.log("Se creo Prueba_Calidad_Agua correctamente!")
                        },
                        function(tx,result){
                            console.error("Error al crear la tabla Prueba_Calidad_Agua");
                        }
                    );
                    tx.executeSql(
                        "Create table if not exists Insumos_C(ID integer primary key, ID_Cedula integer,Horas integer, Cantidad text)",
                        [],
                        function(tx,result){
                            //console.log("Se creo Insumos_C correctamente!")
                        },
                        function(tx,result){
                            console.error("Error al crear la tabla Insumos_C");
                        }
                    );
                    tx.executeSql(
                        "Create table if not exists Stress(ID integer primary key, ID_Cedula integer,Tomas integer, Equipo integer, Hora text, TempeE text, PreE text, TempeS text, PreS text, Bitacora integer)",
                        [],
                        function(tx,result){
                            //console.log("Se creo Stress correctamente!")
                        },
                        function(tx,result){
                            console.error("Error al crear la tabla Stress");
                        }
                    );
                    tx.executeSql(
                        "Create table if not exists Resultado(ID integer primary key, ID_Cedula integer, Tipo integer, Suciedad text, Detergente text)",
                        [],
                        function(tx,result){
                            //console.log("Se creo Resultado correctamente!")
                        },
                        function(tx,result){
                            console.error("Error al crear la tabla Resultado");
                        }
                        
                    );
                    tx.executeSql(
                        "Create table if not exists PL_Fotos(F_ID_Fotos integer primary key,F_ID_Cedula, F_Recorrido integer,F_Proceso integer, F_titulo,F_FechaHora,F_Foto blob )",
                        [],
                        function(tx,results){
                           // console.log("Se creo CC_PL_Fotos correctamente!")
                        },
                        function(tx,results){
                            console.error("Error al crear la tabla CC_Etapa")
                        }
                    );  
                }
                if(empresa == "Proteus"){
                    //Datos generales
                    tx.executeSql(
                        "create table if not exists datos_generales_proteus(id_datos_generales integer primary key,id_cedula text,orden_servicio text,foto_entrada blob,razon_social text,ruc text,local text,direccion text,nombre_contacto text,telefono1 text,telefono2 text,email text,tipo_servicio text, firma_cliente blob,fecha_cliente text,foto_salida blob, cargo text, dni text)",
                        [],
                        function(tx, results){
                            console.log("Se creo Datos Generales Proteus correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla de datos_generales_proteus: " + error.message);
                        }
                    )
                    //Datos equipo
                    tx.executeSql(
                        "create table if not exists datos_equipos_proteus(id_equipo integer primary key,id_cedula text,id_cliente text,modelo text,marca text,ubicacion text)",
                        [],
                        function(tx, results){
                            console.log("Se creo Datos Equipos Proteus correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla de datos_equipos_proteus: " + error.message);
                        }
                    );
                    //Reposicion
                    tx.executeSql(
                        "create table if not exists reposicion_proteus(id_reposicion integer primary key,id_cedula text,kit_micro text,micro_activados text,nivelador text,observaciones text)",
                        [],
                        function(tx, results){
                            console.log("Se creo Reposicion Proteus correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla de reposicion_proteus: " + error.message);
                        }
                    );
                    //Evidencias
                    tx.executeSql(
                        "create table if not exists evidencias_proteus(id_evidencia integer primary key,id_cedula text,comentario text,foto blob,fecha text, page text)",
                        [],
                        function(tx, results){
                            console.log("Se creo Evidencias Proteus correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla de evidencias_proteus: " + error.message);
                        }
                    );
                    //Fotos
                    tx.executeSql(
                        "create table if not exists fotos_proteus(id_foto integer primary key,id_cedula text,fase text,apartado text, foto blob, fecha text)",
                        [],
                        function(tx, results){
                            console.log("Se creo Fotos Proteus correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla de fotos_proteus: " + error.message);
                        }
                    );
                    //Check Limpieza
                    tx.executeSql(
                        "create table if not exists check_limpieza(id_limpieza integer primary key,id_cedula text,fallos text,comentarios text, componente text, piezas text)",
                        [],
                        function(tx, results){
                            console.log("Se creo Check Limpieza correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla de check_limpieza: " + error.message);
                        }
                    );
                    //Check Revision
                    tx.executeSql(
                        "create table if not exists check_revision(id_limpieza integer primary key,id_cedula text, fuente text, fallos text,comentarios text, componente text, piezas text,observaciones text)",
                        [],
                        function(tx, results){
                            console.log("Se creo Check revision correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla de check_revision: " + error.message);
                        }
                    );
                    //Mmto Correctivo
                    tx.executeSql(
                        "create table if not exists mmto_correctivo(id_mmto integer primary key,id_cedula text, reparacion text, funcionamiento text)",
                        [],
                        function(tx, results){
                            console.log("Se creo Mmto Correctivo correctamente!");
                        },
                        function(tx, error){
                            console.error("Error al crear la tabla de mmto_correctivo: " + error.message);
                        }
                    );
                }
            },
            function(error){
                console.error("Error al crear la base de datos: " + error.message);
            },
            function(){
                // console.log("Base de datos creada exitosamente");
            }
        );
    }
}
